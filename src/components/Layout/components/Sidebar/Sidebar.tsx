import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/seller/products">Product</Link>
        </li>
        <li>
          <Link to="/seller/categories">Categories</Link>
        </li>
        <li><Link to="/seller/colors">Colors</Link></li>
      </ul>
    </div>
  )
}
