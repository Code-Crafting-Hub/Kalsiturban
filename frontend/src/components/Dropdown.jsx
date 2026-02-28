import React from 'react'
import { Link } from 'react-router-dom'

export default function Dropdown() {
  return (
    <div className="flex flex-col dropDownProfile">
              <span className="flex flex-col">
                <Link to="/profile" className='hover:bg-gray-400 hover:cursor-pointer px-4 py-2 rounded hover:text-white my-1 mx-2'>Profile</Link>
                <Link className='hover:bg-gray-400 hover:cursor-pointer px-4 py-2 rounded hover:text-white my-1 mx-2'>Orders</Link>
                <Link className='hover:bg-gray-400 hover:cursor-pointer px-4 py-2 rounded hover:text-white my-1 mx-2'>Logout</Link>
              </span>
            </div>
  )
}
