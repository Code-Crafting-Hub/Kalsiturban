import React from 'react'

export default function Navbar() {
  return (
    <div className='bg-orange-500 h-16 justify-around gap-5 items-center flex'>
      <div className='hover:cursor-pointer '>Home</div>
      <div className='hover:cursor-pointer '>About us</div>
      <div className='hover:cursor-pointer '>Rewards</div>
      <div className='hover:cursor-pointer '>Book now</div>
      <div className='hover:cursor-pointer '>Register Now</div>
    </div>
  )
}
