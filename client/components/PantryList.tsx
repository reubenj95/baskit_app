import { Drawer, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'
import pantryAction from '../actions/pantryList'
import categoryAction from '../actions/categories'
import helper from '../helpers/componentHelpers'
import { useAppDispatch, useAppSelector } from '../hooks'
//import EditSlideout from './EditSlideout'
import PantrySliders from './PantrySliders'
import { SliderGroup } from './SliderGroup'

export default function PantryList() {
  const pantryState = useAppSelector((state) => state.pantryList)
  const categoryState = useAppSelector((state) => state.categories)
  const dispatch = useAppDispatch()

  const [opened, { open, close }] = useDisclosure(false)

  useEffect(() => {
    dispatch(categoryAction.fetchCategories())
      .then(() => {
        dispatch(pantryAction.fetchPantryList())
      })
      .catch((err) => console.log(err))
  }, [dispatch])

  if (pantryState.isLoading || categoryState.isLoading) {
    return <div>Loading...</div>
  }
  if (pantryState.error || categoryState.isLoading) {
    return <div>Something went wrong retrieving your fridge list</div>
  }
  if (pantryState.data && categoryState.data) {
    return (
      <>
        <Title order={2}>Your Pantry</Title>

        <div className="container" id="fridge-item-container">
          {categoryState.data.map((item) => {
            return (
              <SliderGroup
                key={item.id}
                parent="pantry"
                group={item}
                opened={() => open()}
                data={pantryState.data}
              />
            )
          })}

          <Drawer
            position="right"
            opened={opened}
            onClose={close}
            title="Authentication"
          >
            {/* <EditSlideout /> */}
          </Drawer>
        </div>
      </>
    )
  }
}
