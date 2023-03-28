import { Routes, Route } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { PantryItem } from '../../models/pantryItems'
import { MantineProvider, AppShell, Navbar, Header } from '@mantine/core'

import PantryList from './PantryList'
import FridgeList from './FridgeLIst'

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        padding="md"
        header={
          <Header height={60} p="xs">
            {/* Header content */}
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <div className="main-container">
          <h1>Baskit</h1>
          <p>React development has begun!</p>

          <Routes>
            <Route path="/" element={<FridgeList />} />
            <Route path="/pantry" element={<PantryList />} />
          </Routes>
        </div>
      </AppShell>
    </MantineProvider>
  )
}

export default App
