import { Drawer, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'
import { fetchPantryList } from '../actions/pantryList'
import { useAppDispatch, useAppSelector } from '../hooks'
import EditSlideout from './EditSlideout'
import { Sliders } from './Sliders'

export default function PantryList() {
  const { isLoading, error, data } = useAppSelector((state) => state.pantryList)
  const dispatch = useAppDispatch()

  const [opened, { open, close }] = useDisclosure(false)

  useEffect(() => {
    dispatch(fetchPantryList())
  }, [dispatch])

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Something went wrong retrieving your fridge list</div>
  }

  return (
    <>
      <Title order={2}>Your Pantry</Title>

      <div className="container" id="fridge-item-container">
        {data &&
          data.map((item) => {
            return (
              <Sliders key={item.id} listItem={item} opened={() => open()} />
            )
          })}

        <Drawer
          position="right"
          opened={opened}
          onClose={close}
          title="Authentication"
        >
          <EditSlideout />
        </Drawer>
      </div>
    </>
  )
}
