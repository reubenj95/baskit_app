import { Divider, Grid, Text } from '@mantine/core'
import { PantryItem } from '../../models/pantryItems'
import { fetchSelectedPantryItem } from '../actions/onePantryItem'
import { useAppDispatch, useAppSelector } from '../hooks'

interface Props {
  listItem: PantryItem
  opened: () => void
}
export function Sliders(props: Props) {
  //useEffect(() => {}, [])
  const dispatch = useAppDispatch()

  const { listItem, opened } = props

  function handleSwipe(event: React.TouchEvent<HTMLDivElement>) {
    const minDistance = 80
    const container = event.currentTarget
    const swipeDistance = container.scrollLeft - container.clientWidth
    if (swipeDistance < minDistance * -1) {
      console.log('1')
    } else if (swipeDistance > minDistance) {
      dispatch(fetchSelectedPantryItem(listItem.id))
      opened()
    } else {
      console.log(`did not swipe ${minDistance}px`)
    }
  }

  return (
    <>
      <div
        className="swipe-container"
        id={`item${listItem.id}`}
        onTouchEnd={handleSwipe}
      >
        <div className="action left">
          <i className="fa-solid fa-trash"></i>
        </div>
        <div className="swipe-element">
          <Grid>
            <Grid.Col span={2}>
              <Text>
                <span className="fridge-qty">{listItem.quantity}</span>
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>{listItem.name}</Grid.Col>
            <Grid.Col span={4}>
              <div className="flex">
                $
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="0.00"
                />
              </div>
            </Grid.Col>
          </Grid>
        </div>
        <div className="action right">
          <i className="fa-solid fa-pen"></i>
        </div>
      </div>
    </>
  )
}
