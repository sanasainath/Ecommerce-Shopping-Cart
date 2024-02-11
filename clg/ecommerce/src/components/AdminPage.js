import React from 'react'
import { Link } from 'react-router-dom'
import NewPage from './NewPage'
function AdminPage() {
  return (
    <div>
     <h1>this is admin page</h1>
     <div className='admin-navigation'>
        <Link to='category' className="nav-link">
          <p>category</p>
        </Link>
        <Link to='product' className="nav-link">
          <p>product</p>
        </Link>
        <Link to='page' className="nav-link">
          <p>page</p>
          <NewPage />
        </Link>
        <Link to='admin/order' className="nav-link">
         adminorder
        </Link>
      </div>
    </div>
  )
}

export default AdminPage
