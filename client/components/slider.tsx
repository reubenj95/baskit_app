import { useState, useRef, useEffect } from 'react'
import { PantryItem } from '../../models/interface'
import { getPantryItems } from '../apiClient'

export function Sliders() {
  const [swipeDistance, setSwipeDistance] = useState()
  const itemsRef = useRef(null as unknown as Map<number, HTMLDivElement>)
  const [pantryItems, setPantryItems] = useState([] as PantryItem[])

  function handleSwipe() {
    const minDistance = 80
    console.log('Swiped!')
  }
  // function handleSwipe() {
  //   // define the minimum distance to trigger the action
  //   const minDistance = 80
  //   const container = document.querySelector('.swipe-container')
  //   const output = document.querySelector('.output')
  //   // get the distance the user swiped
  //   const swipeDistance = container.scrollLeft - container.clientWidth
  //   if (swipeDistance < minDistance * -1) {
  //     output.innerHTML = 'swiped left'
  //   } else if (swipeDistance > minDistance) {
  //     output.innerHTML = 'swiped right'
  //   } else {
  //     output.innerHTML = `did not swipe ${minDistance}px`
  //   }
  // }

  useEffect(() => {
    getPantryItems()
      .then((pantryItems) => {
        setPantryItems(pantryItems)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  function getMap() {
    if (!itemsRef.current) {
      itemsRef.current = new Map()
    }
    return itemsRef.current
  }
  return (
    <div className="container" id="fridge-item-container">
      {pantryItems.map((item) => (
        <div
          key={item.id}
          className="swipe-container"
          id={`item${item.id}`}
          onTouchEnd={handleSwipe}
          ref={(node: HTMLDivElement) => {
            const map = getMap()
            if (node) {
              map.set(item.id, node)
            } else {
              map.delete(item.id)
            }
          }}
        >
          <div className="action left">
            <i className="fa-solid fa-trash"></i>
          </div>
          <div className="swipe-element">
            <li>
              <span className="item-qty">{item.quantity}</span>
              {item.name}
            </li>
          </div>
          <div className="action right">
            <i className="fa-solid fa-pen"></i>
          </div>
        </div>
      ))}
    </div>
  )
}
