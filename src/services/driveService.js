// Google Drive API service to fetch videos from folders
// This uses the Google Drive API v3 to dynamically fetch videos

const GOOGLE_DRIVE_API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY || ''
const DRIVE_ROOT_FOLDER_ID = import.meta.env.VITE_DRIVE_ROOT_FOLDER_ID || ''

export async function fetchVideosFromDrive(teacherName) {
  try {
    if (!GOOGLE_DRIVE_API_KEY) {
      console.warn('Google Drive API key not configured, using mock data')
      return getMockVideos(teacherName)
    }

    if (!DRIVE_ROOT_FOLDER_ID) {
      console.warn('Drive root folder ID not configured, using mock data')
      return getMockVideos(teacherName)
    }

    console.log(`Fetching videos for teacher: ${teacherName}`)

    // 1. Search for teacher folder inside the root folder
    //const folderSearchUrl = `https://www.googleapis.com/drive/v3/files?q=name='${teacherName.toLowerCase()}' and '${DRIVE_ROOT_FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.folder'&key=${GOOGLE_DRIVE_API_KEY}`
    const folderSearchUrl = `https://www.googleapis.com/drive/v3/files?q=name='${teacherName.toLowerCase()}' and mimeType='application/vnd.google-apps.folder'&key=${GOOGLE_DRIVE_API_KEY}`

    const folderResponse = await fetch(folderSearchUrl)

    if (!folderResponse.ok) {
      throw new Error(`HTTP error! status: ${folderResponse.status}`)
    }

    const folderData = await folderResponse.json()

    if (!folderData.files || folderData.files.length === 0) {
      console.log(`No folder found for teacher: ${teacherName}`)
      return []
    }

    const teacherFolderId = folderData.files[0].id
    console.log(`Found folder for ${teacherName} with ID: ${teacherFolderId}`)

    // 2. Get all video files from the teacher's folder
    const videoSearchUrl = `https://www.googleapis.com/drive/v3/files?q='${teacherFolderId}' in parents and (mimeType contains 'video/' or mimeType='application/vnd.google-apps.video')&key=${GOOGLE_DRIVE_API_KEY}`

    const videoResponse = await fetch(videoSearchUrl)

    if (!videoResponse.ok) {
      throw new Error(`HTTP error! status: ${videoResponse.status}`)
    }

    const videoData = await videoResponse.json()

    if (!videoData.files || videoData.files.length === 0) {
      console.log(`No videos found in folder for teacher: ${teacherName}`)
      return []
    }

    console.log(`Found ${videoData.files.length} videos for ${teacherName}`)

    // 3. Convert file IDs to embeddable URLs
    const videoUrls = videoData.files.map(file =>
      `https://drive.google.com/file/d/${file.id}/preview`
    )

    return videoUrls

  } catch (error) {
    console.error('Error fetching videos from Drive:', error)

    // Fallback to mock data on error
    console.log('Falling back to mock data due to error')
    return getMockVideos(teacherName)
  }
}

// Fallback mock data for development or when API fails
function getMockVideos(teacherName) {
  const mockVideos = {
    cleo: [
      'https://drive.google.com/file/d/SAMPLE_VIDEO_ID_1/preview',
      'https://drive.google.com/file/d/SAMPLE_VIDEO_ID_2/preview'
    ],
    pedro: [
      'https://drive.google.com/file/d/SAMPLE_VIDEO_ID_3/preview'
    ],
    dalmazo: [
      'https://drive.google.com/file/d/SAMPLE_VIDEO_ID_4/preview',
      'https://drive.google.com/file/d/SAMPLE_VIDEO_ID_5/preview',
      'https://drive.google.com/file/d/SAMPLE_VIDEO_ID_6/preview'
    ],
    bicho: [
      'https://drive.google.com/file/d/SAMPLE_VIDEO_ID_7/preview'
    ],
    vitor: [
      'https://drive.google.com/file/d/SAMPLE_VIDEO_ID_8/preview',
      'https://drive.google.com/file/d/SAMPLE_VIDEO_ID_9/preview'
    ],
    berri: [
      'https://drive.google.com/file/d/SAMPLE_VIDEO_ID_10/preview'
    ],
    andré: [
      'https://drive.google.com/file/d/SAMPLE_VIDEO_ID_11/preview',
      'https://drive.google.com/file/d/SAMPLE_VIDEO_ID_12/preview'
    ],
    schvittz: [
      'https://drive.google.com/file/d/SAMPLE_VIDEO_ID_13/preview'
    ]
  }

  return mockVideos[teacherName.toLowerCase()] || []
}

// Utility function to convert Google Drive shareable link to embeddable URL
export function convertDriveUrlToEmbed(shareableUrl) {
  const match = shareableUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)
  if (match) {
    return `https://drive.google.com/file/d/${match[1]}/preview`
  }
  return shareableUrl
}

// Utility function to test the API connection
export async function testDriveConnection() {
  try {
    if (!GOOGLE_DRIVE_API_KEY) {
      return { success: false, message: 'API key not configured' }
    }

    if (!DRIVE_ROOT_FOLDER_ID) {
      return { success: false, message: 'Root folder ID not configured' }
    }

    const testUrl = `https://www.googleapis.com/drive/v3/files/${DRIVE_ROOT_FOLDER_ID}?key=${GOOGLE_DRIVE_API_KEY}`
    const response = await fetch(testUrl)

    if (response.ok) {
      return { success: true, message: 'Drive API connection successful' }
    } else {
      return { success: false, message: `API error: ${response.status}` }
    }
  } catch (error) {
    return { success: false, message: `Connection error: ${error.message}` }
  }
}