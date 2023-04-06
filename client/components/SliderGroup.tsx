import { PantryItem } from '../../models/pantryItems'
import { useAppSelector } from '../hooks'
import FridgeSliders from './FridgeSliders'
import PantrySliders from './PantrySliders'
import { Category } from '../../models/pantryItems'
import { Title, Text } from '@mantine/core'

interface SliderGroupProps {
  parent: string
  data: PantryItem[] | undefined
  group: Category
  opened: () => void
}

export function SliderGroup(props: SliderGroupProps) {
  if (!props.data) {
    return <Text>But when she went there, the cupboard was bare!</Text>
  } else if (props.parent === 'pantry') {
    return (
      <div className={`slider-group ${props.group.name}`}>
        <div className="header-box">
          <i className={props.group.icon}></i>
          <Title order={3}>{props.group.name}</Title>
        </div>

        {props.data.map((item) => {
          return (
            <PantrySliders
              key={item.id}
              opened={props.opened}
              listItem={item}
            />
          )
        })}
      </div>
    )
  } else {
    return <p>Couldn&apos;t find what you&apos;re looking for</p>
  }
  // } else if (props.parent === 'none') {
  //   return (
  //     <div className="slider-group all-items">
  //       <div className="header-box">
  //         <Title order={3}>All Items</Title>
  //       </div>
  //       {props.data.map((item) => {
  //         return (
  //           <PantrySliders
  //             key={item.id}
  //             opened={props.opened}
  //             listItem={item}
  //           />
  //         )
  //       })}
  //     </div>
  //   )
  // }
}

// } else if (props.parent === 'fridge') {
// props.data.map((item) => {
//   return (
//     <FridgeSliders key={item.id} opened={props.opened} listItem={item} />
//   )
// })
// } else if (props.parent === 'shoppingList') {
//   return <p>Yeah, nothing here yet fam.</p>
// }
