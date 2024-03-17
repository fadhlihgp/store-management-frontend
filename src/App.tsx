// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { RouterApp } from './routes/RouterApp'
import {useEffect} from "react";
import {themeChange} from "theme-change";

function App() {

    useEffect(() => {
        themeChange(false)
    },[])

  return (
    <>
      <RouterApp />
    </>
  )
}

export default App
