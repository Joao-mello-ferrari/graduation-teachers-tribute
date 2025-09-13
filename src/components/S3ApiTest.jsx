import { useState } from 'react'
import { testS3Connection, getExpectedS3Structure } from '../services/s3Service'

function S3ApiTest() {
  const [testResult, setTestResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showStructure, setShowStructure] = useState(false)

  const handleTest = async () => {
    setIsLoading(true)
    try {
      const result = await testS3Connection()
      setTestResult(result)
    } catch (error) {
      setTestResult({ success: false, message: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleStructure = () => {
    setShowStructure(!showStructure)
  }

  const s3Structure = getExpectedS3Structure()

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      background: 'rgba(255,255,255,0.1)', 
      padding: '1rem', 
      borderRadius: '10px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.2)',
      color: 'white',
      fontSize: '0.9rem',
      zIndex: 1000,
      minWidth: '280px',
      maxWidth: '400px'
    }}>
      <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
        AWS S3 Integration Test
      </div>
      
      <button 
        onClick={handleTest} 
        disabled={isLoading}
        style={{
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.3)',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          marginBottom: '0.5rem',
          width: '100%'
        }}
      >
        {isLoading ? 'Testing S3...' : 'Test S3 Connection'}
      </button>

      <button 
        onClick={toggleStructure}
        style={{
          background: 'rgba(100,150,255,0.2)',
          color: 'white',
          border: '1px solid rgba(100,150,255,0.3)',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '0.5rem',
          width: '100%',
          fontSize: '0.8rem'
        }}
      >
        {showStructure ? 'Hide' : 'Show'} Expected S3 Structure
      </button>
      
      {testResult && (
        <div style={{ 
          marginTop: '0.5rem',
          padding: '0.5rem',
          borderRadius: '5px',
          background: testResult.success ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)',
          border: `1px solid ${testResult.success ? 'rgba(0,255,0,0.3)' : 'rgba(255,0,0,0.3)'}`
        }}>
          <strong>{testResult.success ? '✅ Success' : '❌ Failed'}</strong>
          <br />
          <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
            {testResult.message}
          </div>
        </div>
      )}

      {showStructure && (
        <div style={{ 
          marginTop: '0.5rem',
          padding: '0.5rem',
          borderRadius: '5px',
          background: 'rgba(100,150,255,0.1)',
          border: '1px solid rgba(100,150,255,0.3)',
          fontSize: '0.8rem'
        }}>
          <strong>Expected S3 Structure:</strong>
          <br />
          <div style={{ marginTop: '0.5rem', fontFamily: 'monospace' }}>
            {s3Structure.structure.map((item, index) => (
              <div key={index} style={{ marginBottom: '0.25rem' }}>
                <div>{item.path}</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem', marginLeft: '1rem' }}>
                  └── {item.example.split('/').pop()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default S3ApiTest