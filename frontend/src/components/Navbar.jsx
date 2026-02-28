import React from 'react'

export default function Navbar() {
  return (
    <div className='bg-orange-500 text-white'>
      <div className='flex flex-col md:flex-row md:justify-around items-center gap-3 md:gap-5 h-auto md:h-16 py-4 md:py-0'>
        
        <div className='hover:cursor-pointer px-4 py-2 rounded hover:border hover:border-white border border-orange-500'>
          Home
        </div>

        <div className='hover:cursor-pointer px-4 py-2 rounded hover:border hover:border-white border border-orange-500'>
          About Us
        </div>

        <div className='hover:cursor-pointer px-4 py-2 rounded hover:border hover:border-white border border-orange-500'>
          Rewards
        </div>

        <div className='hover:cursor-pointer px-4 py-2 rounded hover:border hover:border-white border border-orange-500'>
          Book Now
        </div>

        <div className='hover:cursor-pointer px-4 py-2 rounded hover:border hover:border-white border border-orange-500'>
          Register Now
        </div>

      </div>
    </div>
  )
}