// AWS S3 service to fetch and upload videos from/to S3 bucket
import { S3Client, ListObjectsV2Command, PutObjectCommand } from '@aws-sdk/client-s3'

const AWS_REGION = import.meta.env.VITE_AWS_REGION || 'us-east-1'
const AWS_ACCESS_KEY_ID = import.meta.env.VITE_AWS_ACCESS_KEY_ID || ''
const AWS_SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || ''
const S3_BUCKET_NAME = import.meta.env.VITE_S3_BUCKET_NAME || 'graduation-teachers-tribute'

// Initialize S3 client
let s3Client = null

function initializeS3Client() {
  if (!s3Client && AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY) {
    s3Client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    })
  }
  return s3Client
}

// Fetch videos from S3 bucket for a specific teacher
export async function fetchVideosFromS3(teacherName) {
  try {
    const client = initializeS3Client()

    if (!client) {
      console.warn('AWS S3 credentials not configured, using mock data')
      return getMockVideos(teacherName)
    }

    if (!S3_BUCKET_NAME) {
      console.warn('S3 bucket name not configured, using mock data')
      return getMockVideos(teacherName)
    }

    console.log(`Fetching videos for teacher: ${teacherName} from S3`)

    // List objects in the teacher's folder
    const prefix = `${teacherName.toLowerCase()}/`

    const command = new ListObjectsV2Command({
      Bucket: S3_BUCKET_NAME,
      Prefix: prefix,
      Delimiter: '/',
    })


    const response = await client.send(command)

    if (!response.Contents || response.Contents.length === 0) {
      console.log(`No videos found for teacher: ${teacherName}`)
      return []
    }

    // Filter for video files and create URLs
    const videoExtensions = ['.mp4', '.mov', '.avi', '.wmv', '.webm', '.mkv']
    const videoUrls = response.Contents
      .filter(object => {
        const key = object.Key.toLowerCase()
        return videoExtensions.some(ext => key.endsWith(ext)) && key !== prefix
      })
      .map(object => {
        // Create public S3 URL
        return `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${object.Key}`
      })

    console.log('S3 fetch response:', videoUrls)

    console.log(`Found ${videoUrls.length} videos for ${teacherName}`)
    return videoUrls

  } catch (error) {
    console.error('Error fetching videos from S3:', error)

    // Fallback to mock data on error
    console.log('Falling back to mock data due to error')
    return getMockVideos(teacherName)
  }
}

// Test S3 connection
export async function testS3Connection() {
  try {
    const client = initializeS3Client()

    if (!client) {
      return { success: false, message: 'AWS credentials not configured' }
    }

    if (!S3_BUCKET_NAME) {
      return { success: false, message: 'S3 bucket name not configured' }
    }

    // Test by listing objects in the bucket root
    const command = new ListObjectsV2Command({
      Bucket: S3_BUCKET_NAME,
      MaxKeys: 1,
    })

    const response = await client.send(command)

    return {
      success: true,
      message: `Connected to S3 bucket: ${S3_BUCKET_NAME}`
    }
  } catch (error) {
    return {
      success: false,
      message: `S3 connection error: ${error.message || 'Unknown error'}`
    }
  }
}

// Fallback mock data for development or when S3 fails
function getMockVideos(teacherName) {
  const mockVideos = {
    cleo: [
      `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/cleo/sample-video-1.mp4`,
      `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/cleo/sample-video-2.mp4`
    ],
    pedro: [
      `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/pedro/sample-video-1.mp4`
    ],
    dalmazo: [
      `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/dalmazo/sample-video-1.mp4`,
      `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/dalmazo/sample-video-2.mp4`,
      `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/dalmazo/sample-video-3.mp4`
    ],
    bicho: [
      `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/bicho/sample-video-1.mp4`
    ],
    vitor: [
      `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/vitor/sample-video-1.mp4`,
      `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/vitor/sample-video-2.mp4`
    ],
    berri: [
      `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/berri/sample-video-1.mp4`
    ],
    andré: [
      `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/andré/sample-video-1.mp4`,
      `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/andré/sample-video-2.mp4`
    ],
    schvittz: [
      `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/schvittz/sample-video-1.mp4`
    ]
  }

  return mockVideos[teacherName.toLowerCase()] || []
}

// Get S3 bucket structure for teachers
export function getExpectedS3Structure() {
  const teachers = ['cleo', 'pedro', 'dalmazo', 'bicho', 'vitor', 'berri', 'andré', 'schvittz']

  return {
    bucketName: S3_BUCKET_NAME,
    structure: teachers.map(teacher => ({
      teacher,
      path: `s3://${S3_BUCKET_NAME}/${teacher}/`,
      example: `s3://${S3_BUCKET_NAME}/${teacher}/tribute-video-1.mp4`
    }))
  }
}

// Utility function to get public S3 URL for a file
export function getS3PublicUrl(key) {
  return `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`
}

// Upload video to S3 bucket for a specific teacher
export async function uploadVideoToS3(file, teacherName, onProgress = null) {
  try {
    const client = initializeS3Client()

    if (!client) {
      throw new Error('S3 client not initialized. Check AWS credentials.')
    }

    // Generate unique filename with timestamp
    const timestamp = new Date().getTime()
    const fileExtension = file.name.split('.').pop()
    const fileName = `tribute-video-${timestamp}.${fileExtension}`
    const key = `${teacherName}/${fileName}`

    console.log(`Uploading ${file.name} to ${key}`)

    // Convert File to ArrayBuffer for browser compatibility
    const arrayBuffer = await file.arrayBuffer()

    const command = new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key,
      Body: arrayBuffer,
      ContentType: file.type,
      // Make the file publicly readable
      ACL: 'public-read'
    })

    // Upload the file
    const result = await client.send(command)

    const publicUrl = getS3PublicUrl(key)
    console.log(`Successfully uploaded video: ${publicUrl}`)

    return {
      success: true,
      url: publicUrl,
      key: key,
      fileName: fileName,
      teacher: teacherName
    }

  } catch (error) {
    console.error('Error uploading video to S3:', error)

    // Provide specific error messages
    if (error.name === 'AccessDenied') {
      throw new Error('Access denied. Check S3 bucket permissions for uploads.')
    } else if (error.name === 'InvalidBucketName') {
      throw new Error('Invalid bucket name. Check S3_BUCKET_NAME configuration.')
    } else {
      throw new Error(`Upload failed: ${error.message}`)
    }
  }
}

// Legacy function name for backward compatibility
export const fetchVideosFromDrive = fetchVideosFromS3
export const testDriveConnection = testS3Connection