import { FridgeItem, PantryItem } from '../../models/pantryItems'

interface Props {
  listItem: FridgeItem | PantryItem
}
export function Sliders({ listItem }: Props) {
  //useEffect(() => {}, [])

  function handleSwipe(event: React.TouchEvent<HTMLDivElement>) {
    const minDistance = 80
    const container = event.currentTarget
    const swipeDistance = container.scrollLeft - container.clientWidth
    const itemId = Number(container.id.slice(4))
    if (swipeDistance < minDistance * -1) {
      console.log(itemId)
    } else if (swipeDistance > minDistance) {
      console.log(itemId)
    } else {
      console.log(`did not swipe ${minDistance}px`)
    }
  }

  return (
    <div
      className="swipe-container"
      id={`item${listItem.id}`}
      onTouchEnd={handleSwipe}
    >
      <div className="action left">
        <i className="fa-solid fa-trash"></i>
      </div>
      <div className="swipe-element">
        {listItem.quantity} - {listItem.name}
      </div>
      <div className="action right">
        <i className="fa-solid fa-pen"></i>
      </div>
    </div>
  )
}
