import { useState } from 'react'
import './App.css'
import Buttons from './components/Buttons'
import Footer from './components/Footer'
import ScoreCalc from './components/ScoreCalc'
import UserGuide from './components/UserGuide'

function App() {
  const [isNotesOpen, setIsNotesOpen] = useState(false)

  const openNotes = () => {
    setIsNotesOpen(true)
  }

  const closeNotes = () => {
    setIsNotesOpen(false)
  }
  return (
    <>
      <div className="flex flex-col min-h-screen items-center">
        <div className="md:max-w-[80vw] flex flex-col px-2 py-4 gap-2">
          <div className='flex justify-between px-4 py-4'>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Subject Score Calculator
              </h1>
              <p>
                A simple tool to calculate your subject scores.
              </p>
            </div>
            <div>
              <Buttons type="button" onClick={openNotes} buttonColor="bg-blue-500 hover:bg-blue-600">User Guide</Buttons>
            </div>
          </div>
          <ScoreCalc />
          <Footer />
        </div>
      </div>
      {isNotesOpen && <UserGuide onClose={closeNotes} />}
    </>
  )
}

export default App
