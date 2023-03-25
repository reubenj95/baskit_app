import { getOnePantryItem } from '../../db'
interface ItemId {
  itemId: number
}

export default function EditPantryItem() {
  //const item = getOnePantryItem()

  return (
    <div className="edit-container offscreen-right">
      <img src="/imgs/fruit-placeholder.jpg" alt="" />
      <div className="pantry-item-details">
        <h3>Placeholder Title</h3>
        <p>Quantity: 12</p>
        <p>Category: Produce</p>
        <p>Brand: Generic</p>
        <p>Best before: 10/04/23</p>
      </div>
    </div>
  )
}
