import React from 'react'
import Navbar from './Components/Navbar.jsx'
import Upladsong from './Components/Uploadsong.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Homepage from './Components/Homepage.jsx'
import Getmusicdata from './Components/Getmusicdata.jsx'
function App() {
  return (
    <>
    <BrowserRouter>
   <Navbar/>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
       <Route path='/uploadsong' element={<Upladsong/>}/>
        <Route path='/getdata' element={<Getmusicdata/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App