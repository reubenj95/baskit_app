import { Button, Grid, Modal, Text, Title } from '@mantine/core'
import { PantryItem } from '../../models/pantryItems'
import { useAppDispatch, useAppSelector } from '../hooks'
import pantryAction from '../actions/pantryList'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'

interface Props {
  listItem: PantryItem
  opened: () => void
}
export default function Sliders(props: Props) {
  const dispatch = useAppDispatch()
  const [opened, { open, close }] = useDisclosure(false)
  const [selected, setSelected] = useState(0)

  function handleSwipe(event: React.TouchEvent<HTMLDivElement>) {
    const minDistance = 80
    const container = event.currentTarget
    const swipeDistance = container.scrollLeft - container.clientWidth
    if (swipeDistance < minDistance * -1) {
      setSelected(Number(event.currentTarget.id.substring(4)))
      open()
    } else if (swipeDistance > minDistance) {
      props.opened()
    } else {
      console.log(`did not swipe ${minDistance}px`)
    }
  }
  function handleDelete() {
    dispatch(pantryAction.deleteFromPantry(selected))
  }

  return (
    <>
      <div
        className="swipe-container"
        id={`item${props.listItem.id}`}
        onTouchEnd={handleSwipe}
      >
        <div className="action left">
          <i className="fa-solid fa-trash"></i>
        </div>
        <div className="swipe-element">
          <Grid>
            <Grid.Col span={2}></Grid.Col>
            <Grid.Col span={6}>
              <Title order={4}>{props.listItem.name}</Title>
            </Grid.Col>
            <Grid.Col span={4}>
              <Text>
                <span className="fridge-qty">{props.listItem.quantity}</span>
              </Text>
            </Grid.Col>
          </Grid>
        </div>
        <div className="action right">
          <i className="fa-solid fa-pen"></i>
        </div>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        yOffset="25vh"
      >
        <Title>Are you sure you want to delete this item?</Title>
        <Text>This cannot be undone.</Text>
        <Button onClick={handleDelete}>Yes, delete</Button>
        <Button onClick={close}>No, go back</Button>
      </Modal>
    </>
  )
}
