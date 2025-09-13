import { Link } from 'react-router-dom'
import DriveApiTest from '../components/DriveApiTest'
import './HomePage.css'

const teachers = [
  'Cleo',
  'Pedro', 
  'Dalmazo',
  'Bicho',
  'Vitor',
  'Berri',
  'André',
  'Schvittz'
]

function HomePage() {
  return (
    <div className="homepage">
      <div className="homepage-header">
        <h1>Tribute to Our Amazing Teachers</h1>
        <p>Celebrating our graduation and honoring the educators who guided us</p>
      </div>
      
      <div className="teachers-grid">
        {teachers.map((teacher) => (
          <Link 
            key={teacher}
            to={`/teacher/${teacher.toLowerCase()}`}
            className="teacher-card"
          >
            <h3>{teacher}</h3>
            <p>Click to see tribute videos</p>
          </Link>
        ))}
      </div>
      
      <DriveApiTest />
    </div>
  )
}

export default HomePage