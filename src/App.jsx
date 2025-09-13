import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TeacherTribute from './pages/TeacherTribute'
import UploadPage from './pages/UploadPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teacher/:teacherName" element={<TeacherTribute />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </Router>
  )
}

export default App
