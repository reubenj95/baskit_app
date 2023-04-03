import { PantryItem } from '../../models/pantryItems'
import FridgeSliders from './FridgeSliders'
import PantrySliders from './PantrySliders'

interface SliderGroupProps {
  parent: string
  data: PantryItem[]
  opened: () => void
}

export function SliderGroup(props: SliderGroupProps) {
  if (props.parent === 'pantry') {
    props.data.map((item) => {
      return (
        <PantrySliders key={item.id} opened={props.opened} listItem={item} />
      )
    })
  } else if (props.parent === 'fridge') {
    props.data.map((item) => {
      return (
        <FridgeSliders key={item.id} opened={props.opened} listItem={item} />
      )
    })
  } else if (props.parent === 'shoppingList') {
    return <p>Yeah, nothing here yet fam.</p>
  }
}
