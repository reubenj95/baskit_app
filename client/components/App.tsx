import { Routes, Route } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { PantryItem } from '../../models/interface'

import { PantrySliders } from './PantrySliders'

function App() {
  return (
    <div className="main-container">
      <h1>App</h1>
      <p>React development has begun!</p>
      <Routes>
        <Route path="/pantry" element={<PantrySliders />} />
      </Routes>
    </div>
  )
}

export default App
