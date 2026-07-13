// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import Footer from './components/Footer'
import ScoreCalc from './components/ScoreCalc'

function App() {

  return (
    <>
      <div className="flex flex-col min-h-screen items-center">
        <div className="max-w-[80vw] flex flex-col px-2 py-4 gap-2">
          <h1 className="text-xl font-bold tracking-tight">
            Subject Score Calculator
          </h1>
          <p>
            A simple tool to calculate your subject scores.
          </p>
          <ScoreCalc />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
