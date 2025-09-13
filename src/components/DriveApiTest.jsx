import { useState } from 'react'
import { testDriveConnection } from '../services/driveService'

function DriveApiTest() {
  const [testResult, setTestResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTest = async () => {
    setIsLoading(true)
    try {
      const result = await testDriveConnection()
      setTestResult(result)
    } catch (error) {
      setTestResult({ success: false, message: error.message })
    } finally {
      setIsLoading(false)
    }
  }

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
      zIndex: 1000
    }}>
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
        {isLoading ? 'Testing...' : 'Test Drive API'}
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
          {testResult.message}
        </div>
      )}
    </div>
  )
}

export default DriveApiTest