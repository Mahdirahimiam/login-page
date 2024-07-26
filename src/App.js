import React, { useState } from 'react'
import { Route,Routes,Navigate } from 'react-router-dom'
import Home from './Pages/Home'

import AuthContext from './utils/AuthContext'
import Login from './Pages/Login/index.jsx'
export default function App() {
  const [token,setToken]=useState()
  const handleToken=(tr)=>{
    setToken(tr)
  }
  return (
    <>
    <AuthContext.Provider value={{token,handleToken}}>
       <div style={{minHeight:'80vh'}}>
       <Routes>
          <Route exact path='/' element={token?<Home/>:<Navigate to={'/login'}/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
       </div>
      </AuthContext.Provider>
    </>
  )
}
