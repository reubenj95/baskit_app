import { useEffect } from 'react'
import { fetchFridgeList } from '../actions/fridgeList'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Sliders } from './Sliders'

export default function FridgeList() {
  //const [newFruit, setNewFruit] = useState({ name: '' } as FruitCreate)
  //import { FruitCreate } from '../../models/pantryItems'
  const { isLoading, error, data } = useAppSelector((state) => state.fridgeList)
  // Needs to match what's in our combineReducers when setting up this state ^^

  const dispatch = useAppDispatch()

  // Redux with Thunk actions
  useEffect(() => {
    dispatch(fetchFridgeList())
  }, [dispatch])

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Something went wrong retrieving your fridge list</div>
  }

  return (
    <>
      <div className="container">
        {data &&
          data.map((item) => {
            return <p>Bananas</p>
            //return <Sliders listItem={item} key={item.id} />
          })}
      </div>
    </>
  )
}
