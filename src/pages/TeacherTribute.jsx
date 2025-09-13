import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import VideoCarousel from '../components/VideoCarousel'
import { fetchVideosFromS3 } from '../services/s3Service'
import './TeacherTribute.css'

function TeacherTribute() {
  const { teacherName } = useParams()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true)
        const videoUrls = await fetchVideosFromS3(teacherName)
        setVideos(videoUrls)
      } catch (err) {
        setError(`Failed to load videos for ${teacherName}`)
        console.error('Error loading videos:', err)
      } finally {
        setLoading(false)
      }
    }

    loadVideos()
  }, [teacherName])

  const capitalizedName = teacherName?.charAt(0).toUpperCase() + teacherName?.slice(1)

  return (
    <div className="teacher-tribute">
      <div className="background-overlay"></div>
      
      <Link to="/" className="back-button">
        ← Back to Teachers
      </Link>

      <div className="tribute-content">
        <h1>Tribute to Professor {capitalizedName}</h1>
        
        {loading && (
          <div className="loading">Loading tribute videos...</div>
        )}
        
        {error && (
          <div className="error">
            <p>{error}</p>
            <p>Please make sure videos are uploaded to the S3 folder: s3://graduation-teachers-tribute/{teacherName}/</p>
          </div>
        )}
        
        {!loading && !error && videos.length === 0 && (
          <div className="no-videos">
            <p>No videos found for Professor {capitalizedName}</p>
            <p>Videos should be uploaded to: s3://graduation-teachers-tribute/{teacherName}/</p>
          </div>
        )}
        
        {!loading && !error && videos.length > 0 && (
          <VideoCarousel videos={videos} teacherName={capitalizedName} />
        )}
      </div>
    </div>
  )
}

export default TeacherTribute