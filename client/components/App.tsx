import { useEffect, useRef, useState } from 'react'
import { PantryItem } from '../../models/interface'

import { Sliders } from './slider'

function App() {
  return (
    <div>
      <h1>App</h1>
      <p>React development has begun!</p>

      <Sliders />
    </div>
  )
}

export default App
