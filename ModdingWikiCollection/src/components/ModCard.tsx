import { Link } from 'react-router-dom'

export default function ModCard({ mod }: any) {
  return (
    <div>
      <h3>{mod.title}</h3>
      <p>{mod.description}</p>
      <Link to={`/mod/${mod.id}`}>View</Link>
    </div>
  )
}

