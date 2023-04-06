import { Routes, Route, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { PantryItem } from '../../models/pantryItems'
import {
  MantineProvider,
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  Text,
  Aside,
  Grid,
  Title,
  Footer,
  Flex,
} from '@mantine/core'

import PantryList from './PantryList'
import FridgeList from './FridgeList'
import { useDisclosure } from '@mantine/hooks'

function App() {
  const [opened, setOpened] = useState(false)
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        padding="md"
        header={
          <Header height={60} p="xs">
            <Grid>
              <Grid.Col span={3}>
                <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    mr="xl"
                    alt-text="menu"
                  />
                </MediaQuery>
              </Grid.Col>
              <Grid.Col span={6}>
                <Title order={1} weight={100} align="center">
                  bask.it
                </Title>
              </Grid.Col>
              <Grid.Col span={3}></Grid.Col>
            </Grid>
          </Header>
        }
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <Text>Application navbar</Text>
          </Navbar>
        }
        footer={
          <Footer height={'100'}>
            <div className="footer-button-container">
              <Link to="/">
                <div className="footer-button">
                  <i className="fa-solid fa-clipboard"></i>
                  <p>Fridge</p>
                </div>
              </Link>
              <Link to="/shopping-lists">
                <div className="footer-button">
                  <i className="fa-solid fa-list"></i>
                  <p>Lists</p>
                </div>
              </Link>
              <Link to="/pantry">
                <div className="footer-button">
                  <i className="fa-solid fa-bread-slice"></i>
                  <p>Pantry</p>
                </div>
              </Link>
            </div>
          </Footer>
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
          <Routes>
            <Route path="/" element={<FridgeList />} />
            <Route path="/pantry" element={<PantryList />} />
            <Route path="/shopping-lists" element={<PantryList />} />
          </Routes>
        </div>
      </AppShell>
    </MantineProvider>
  )
}

export default App
