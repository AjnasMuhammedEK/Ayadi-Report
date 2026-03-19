import { useState } from 'react'
import './App.css'
import Home from './components/Home/Home'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Home />
    </>
  )
}

export default App