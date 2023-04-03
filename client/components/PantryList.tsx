import { Drawer, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'
import pantryAction from '../actions/pantryList'
import { useAppDispatch, useAppSelector } from '../hooks'
import EditSlideout from './EditSlideout'
import PantrySliders from './PantrySliders'

export default function PantryList() {
  const { isLoading, error, data } = useAppSelector((state) => state.pantryList)
  const dispatch = useAppDispatch()

  const [opened, { open, close }] = useDisclosure(false)

  useEffect(() => {
    dispatch(pantryAction.fetchPantryList())
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
              <PantrySliders
                key={item.id}
                listItem={item}
                opened={() => open()}
              />
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
