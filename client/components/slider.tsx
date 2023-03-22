import { useState, useEffect } from 'react'
import arraySort from 'array-sort'
import { PantryItem } from '../../models/interface'
import { getPantryItems } from '../apiClient'
import AscDesc from './ascDesc'

export function Sliders() {
  const [groupBy, setGroupBy] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [ascDesc, setAscDesc] = useState('fa-arrow-down-a-z')
  const [pantryItems, setPantryItems] = useState([] as PantryItem[])

  // function handleSwipe(event: React.TouchEvent<HTMLDivElement>) {
  //   const minDistance = 80
  //   // const swipeDistance =
  //   console.log(event.target.scrollLeft)
  //   console.log('Swiped!')
  // }
  function handleSwipe(event: React.TouchEvent<HTMLDivElement>) {
    // define the minimum distance to trigger the action
    const minDistance = 80
    const container = event.currentTarget
    console.log(container)
    // get the distance the user swiped

    const swipeDistance = container.scrollLeft - container.clientWidth
    if (swipeDistance < minDistance * -1) {
      console.log('swiped left')
    } else if (swipeDistance > minDistance) {
      console.log('swiped right')
    } else {
      console.log(`did not swipe ${minDistance}px`)
    }
  }

  const handleCheckboxChange = () => {
    if (ascDesc === 'fa-arrow-down-a-z') {
      setAscDesc('fa-arrow-up-z-a')
    } else {
      setAscDesc('fa-arrow-down-a-z')
    }
  }
  useEffect(() => {
    getPantryItems()
      .then((pantryItems) => {
        const sortedItems = arraySort(pantryItems, [groupBy, sortBy])
        if (ascDesc === 'fa-arrow-up-z-a') {
          sortedItems.reverse()
          setPantryItems(sortedItems)
        } else {
          setPantryItems(sortedItems)
        }
        setPantryItems(sortedItems)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [groupBy, sortBy, ascDesc])
  return (
    <div className="container" id="fridge-item-container">
      <div>
        <label htmlFor="groupBy">Group by </label>
        <select
          name="groupBy"
          id="groupBy"
          onChange={(event) => {
            setGroupBy(event.target.value)
          }}
        >
          {' '}
          <option value=""></option>
          <option value="category">Category</option>
          <option value="brand">Brand</option>
        </select>
        <label htmlFor="sortBy">Sort by</label>
        <select
          name="sortBy"
          id="sortBy"
          onChange={(event) => {
            setSortBy(event.target.value)
          }}
        >
          <option value=""></option>
          <option value="name">Name</option>
          <option value="date added">Date added</option>
          <option value="best before">Best before</option>
        </select>
        <AscDesc icon={ascDesc} handleChange={handleCheckboxChange} />
      </div>
      {pantryItems.map((item) => (
        <div
          key={item.id}
          className="swipe-container"
          id={`item${item.id}`}
          onTouchEnd={handleSwipe}
        >
          <div className="action left">
            <i className="fa-solid fa-trash"></i>
          </div>
          <div className="swipe-element">
            {item.quantity} - {item.name}
          </div>
          <div className="action right">
            <i className="fa-solid fa-pen"></i>
          </div>
        </div>
      ))}
    </div>
  )
}
getPantryItems
