import React, { useState } from 'react'
import { uploadVideoToS3 } from '../services/s3Service'
import './UploadPage.css'

const TEACHERS = [
  { name: 'cleo', displayName: 'Prof. Cleo' },
  { name: 'pedro', displayName: 'Prof. Pedro' },
  { name: 'dalmazo', displayName: 'Prof. Dalmazo' },
  { name: 'bicho', displayName: 'Prof. Bicho' },
  { name: 'vitor', displayName: 'Prof. Vitor' },
  { name: 'berri', displayName: 'Prof. Berri' },
  { name: 'andre', displayName: 'Prof. André' },
  { name: 'schvittz', displayName: 'Prof. Schvittz' }
]

function UploadPage() {
  const [selectedTeacher, setSelectedTeacher] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadResult, setUploadResult] = useState(null)
  const [error, setError] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file)
      setError(null)
    } else {
      setError('Please select a valid video file')
    }
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files[0]
    handleFileSelect(file)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragOver(false)
    const file = event.dataTransfer.files[0]
    handleFileSelect(file)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setDragOver(false)
  }

  const handleUpload = async () => {
    if (!selectedFile || !selectedTeacher) {
      setError('Please select a teacher and a video file')
      return
    }

    setUploading(true)
    setUploadProgress(0)
    setError(null)
    setUploadResult(null)

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev < 90) return prev + 10
          return prev
        })
      }, 200)

      const result = await uploadVideoToS3(selectedFile, selectedTeacher)
      
      clearInterval(progressInterval)
      setUploadProgress(100)
      
      setUploadResult(result)
      
      // Reset form after successful upload
      setTimeout(() => {
        setSelectedFile(null)
        setSelectedTeacher('')
        setUploadProgress(0)
        setUploadResult(null)
      }, 3000)

    } catch (err) {
      setError(err.message)
      setUploadProgress(0)
    } finally {
      setUploading(false)
    }
  }

  const resetForm = () => {
    setSelectedFile(null)
    setSelectedTeacher('')
    setError(null)
    setUploadResult(null)
    setUploadProgress(0)
  }

  return (
    <div className="upload-page">
      <div className="upload-container">
        <div className="upload-header">
          <h1>📹 Upload Tribute Video</h1>
          <p>Share a special message for one of our amazing teachers</p>
        </div>

        <div className="upload-form">
          {/* Teacher Selection */}
          <div className="form-group">
            <label htmlFor="teacher-select">Select Teacher:</label>
            <select
              id="teacher-select"
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              className="teacher-select"
            >
              <option value="">Choose a teacher...</option>
              {TEACHERS.map(teacher => (
                <option key={teacher.name} value={teacher.name}>
                  {teacher.displayName}
                </option>
              ))}
            </select>
          </div>

          {/* File Upload Area */}
          <div 
            className={`file-upload-area ${dragOver ? 'drag-over' : ''} ${selectedFile ? 'has-file' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {selectedFile ? (
              <div className="file-selected">
                <div className="file-icon">🎬</div>
                <div className="file-info">
                  <div className="file-name">{selectedFile.name}</div>
                  <div className="file-size">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </div>
                </div>
                <button 
                  type="button" 
                  className="remove-file-btn"
                  onClick={() => setSelectedFile(null)}
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="file-upload-prompt">
                <div className="upload-icon">📤</div>
                <p>Drag and drop your video here, or</p>
                <label htmlFor="file-input" className="file-input-label">
                  Choose File
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept="video/*"
                  onChange={handleFileInputChange}
                  className="file-input"
                />
                <p className="file-hint">Supported formats: MP4, MOV, AVI, etc.</p>
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="upload-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p>Uploading... {uploadProgress}%</p>
            </div>
          )}

          {/* Upload Button */}
          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={!selectedFile || !selectedTeacher || uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Video'}
          </button>

          {/* Success Message */}
          {uploadResult && (
            <div className="upload-success">
              <div className="success-icon">✅</div>
              <h3>Upload Successful!</h3>
              <p>Your tribute video for <strong>{TEACHERS.find(t => t.name === uploadResult.teacher)?.displayName}</strong> has been uploaded successfully.</p>
              <div className="success-details">
                <p><strong>File:</strong> {uploadResult.fileName}</p>
                <p><strong>Video URL:</strong> <a href={uploadResult.url} target="_blank" rel="noopener noreferrer">View Video</a></p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="upload-error">
              <div className="error-icon">❌</div>
              <h3>Upload Failed</h3>
              <p>{error}</p>
              <button onClick={resetForm} className="retry-btn">Try Again</button>
            </div>
          )}
        </div>

        <div className="upload-footer">
          <p>💡 <strong>Tip:</strong> Keep your video under 50MB for faster uploads</p>
          <p>🎓 Your tribute will be added to the teacher's page automatically</p>
        </div>
      </div>
    </div>
  )
}

export default UploadPage