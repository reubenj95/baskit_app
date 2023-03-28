import { useEffect } from 'react'
import { fetchPantryList } from '../actions/pantryList'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Sliders } from './Sliders'

export default function PantryList() {
  const { isLoading, error, data } = useAppSelector((state) => state.pantryList)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPantryList())
  }, [dispatch])

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Something went wrong retrieving your fridge list</div>
  }

  return (
    <>
      <div className="container" id="fridge-item-container">
        {data &&
          data.map((item) => {
            console.log(item)
            return <Sliders listItem={item} key={item.id} />
          })}
      </div>
    </>
  )
}
