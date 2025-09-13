import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TeacherTribute from './pages/TeacherTribute'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teacher/:teacherName" element={<TeacherTribute />} />
      </Routes>
    </Router>
  )
}

export default App
