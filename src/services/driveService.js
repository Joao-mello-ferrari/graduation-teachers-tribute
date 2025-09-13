// Google Drive API service to fetch videos from folders
// This will require Google Drive API key and folder sharing configuration

const GOOGLE_DRIVE_API_KEY = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY || ''

// For demo purposes, returning mock data. 
// In production, you'll need to:
// 1. Set up Google Drive API credentials
// 2. Create folders for each teacher with their names
// 3. Make folders publicly accessible or use service account
// 4. Upload videos to respective folders

export async function fetchVideosFromDrive(teacherName) {
  try {
    // Mock data for development - replace with actual Google Drive API calls
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
      victor: [
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

    // Return mock data for now
    return mockVideos[teacherName.toLowerCase()] || []

    // TODO: Implement actual Google Drive API integration
    // Example implementation:
    /*
    if (!GOOGLE_DRIVE_API_KEY) {
      throw new Error('Google Drive API key not configured')
    }

    // 1. Search for folder by teacher name
    const folderSearchResponse = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=name='${teacherName}' and mimeType='application/vnd.google-apps.folder'&key=${GOOGLE_DRIVE_API_KEY}`
    )
    
    const folderData = await folderSearchResponse.json()
    
    if (!folderData.files || folderData.files.length === 0) {
      return []
    }

    const folderId = folderData.files[0].id

    // 2. Get all video files from the folder
    const videoSearchResponse = await fetch(
      `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and (mimeType contains 'video/')&key=${GOOGLE_DRIVE_API_KEY}`
    )
    
    const videoData = await videoSearchResponse.json()
    
    // 3. Convert file IDs to embeddable URLs
    return videoData.files.map(file => 
      `https://drive.google.com/file/d/${file.id}/preview`
    )
    */
    
  } catch (error) {
    console.error('Error fetching videos from Drive:', error)
    throw error
  }
}

// Utility function to convert Google Drive shareable link to embeddable URL
export function convertDriveUrlToEmbed(shareableUrl) {
  const match = shareableUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)
  if (match) {
    return `https://drive.google.com/file/d/${match[1]}/preview`
  }
  return shareableUrl
}