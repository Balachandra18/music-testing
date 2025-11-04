import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <>
    <div className='border-2 p-2 bg-gradient-to-l from-35% to-blue-500 to-75%  bg-red-400 text-white text-2xl'>
        <ul className='flex justify-around  font-bold'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/uploadsong'>Upload Song</Link></li>
            <li><Link to='/getdata'>Musicdata</Link></li>
        </ul>
    </div>
    </>
  )
}

export default Navbar