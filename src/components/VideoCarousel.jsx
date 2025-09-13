import { useState, useEffect } from 'react'
import './VideoCarousel.css'

function VideoCarousel({ videos, teacherName }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
    setIsPlaying(false)
  }

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length)
    setIsPlaying(false)
  }

  const goToVideo = (index) => {
    setCurrentVideoIndex(index)
    setIsPlaying(false)
  }

  useEffect(() => {
    setCurrentVideoIndex(0)
    setIsPlaying(false)
  }, [videos])

  if (!videos || videos.length === 0) {
    return <div className="no-videos">No videos available</div>
  }

  return (
    <div className="video-carousel">
      <div className="carousel-header">
        <h2>Students' Messages for Professor {teacherName}</h2>
        <p>Video {currentVideoIndex + 1} of {videos.length}</p>
      </div>

      <div className="video-container">
        <video
          src={videos[currentVideoIndex]}
          title={`Tribute video ${currentVideoIndex + 1} for ${teacherName}`}
          controls
          className="video-player"
          onLoadStart={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          Your browser does not support the video tag.
          <a href={videos[currentVideoIndex]} target="_blank" rel="noopener noreferrer">
            Download video
          </a>
        </video>
      </div>

      {videos.length > 1 && (
        <>
          <div className="carousel-controls">
            <button 
              onClick={prevVideo}
              className="control-btn prev-btn"
              aria-label="Previous video"
            >
              ‹
            </button>
            
            <button 
              onClick={nextVideo}
              className="control-btn next-btn"
              aria-label="Next video"
            >
              ›
            </button>
          </div>

          <div className="video-indicators">
            {videos.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentVideoIndex ? 'active' : ''}`}
                onClick={() => goToVideo(index)}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default VideoCarousel