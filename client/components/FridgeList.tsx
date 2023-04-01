import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Space,
  Title,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { addToFridgeList, fetchFridgeList } from '../actions/fridgeList'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Sliders } from './FridgeSliders'
import { PantryItem } from '../../models/pantryItems'
import { fetchPantryList } from '../actions/pantryList'

export default function FridgeList() {
  //const [newFruit, setNewFruit] = useState({ name: '' } as FruitCreate)
  //import { FruitCreate } from '../../models/pantryItems'
  const fridgeState = useAppSelector((state) => state.fridgeList)
  const pantryState = useAppSelector((state) => state.pantryList)
  const [opened, { open, close }] = useDisclosure(false)
  const [input, setInput] = useState('')
  const [options, setOptions] = useState([] as string[])
  const dispatch = useAppDispatch()

  // Redux with Thunk actions
  useEffect(() => {
    dispatch(fetchFridgeList())
    dispatch(fetchPantryList())
  }, [dispatch])

  useEffect(() => {
    updateOptions()
  }, [pantryState.data])

  //Dispatch action to add item to fridge list
  //If item doesn't exist in pantry, Add item to pantry
  //Update Pantry state with response (all pantry items from DB)
  //Add item to fridge list
  //Add item to options exclusions
  //Re render fridge list

  function handleAddItem(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    if (pantryState.data) {
      const names = pantryState.data.map((item) => item.name)
      const newItem = names.find((name) => name === input)
      if (newItem) {
        const existingItem = pantryState.data.filter(
          (item) => item.name === newItem
        )
        console.log(existingItem[0])
        dispatch(addToFridgeList(existingItem[0]))
      } else {
        console.log('Could not find that in the pantry, so I will add it now')
        // dispatch(addToPantry())
        //   .then((itemId) => {
        //     addItemToFridgeList()
        //   })
        //   .catch((err) => console.error(err))
      }
    }
  }

  function updateOptions() {
    if (pantryState.data) {
      const data = pantryState.data.map((item) => item.name)
      setOptions(data)
    }
  }

  if (fridgeState.isLoading) {
    return (
      <div>
        <img src="/imgs/loading-cart.gif" alt="loading" />
      </div>
    )
  }
  if (fridgeState.error) {
    return <div>Something went wrong retrieving your fridge list</div>
  }

  return (
    <>
      <Center maw={400} h={200} mx="auto">
        <Flex gap="md" justify="center" align="center" direction="column">
          <Title order={2} align="center">
            Start typing to add to your grocery list
          </Title>
          <form onSubmit={handleAddItem}>
            <Flex direction="column" justify="center">
              <Autocomplete
                placeholder="..."
                value={input}
                onChange={setInput}
                data={options}
              />
              <Space h="sm" />
              <Button variant="outline" type="submit">
                Add item
              </Button>
            </Flex>
          </form>
        </Flex>
      </Center>
      <Divider my="md" size="sm"></Divider>
      <Space h="md" />
      <div className="container">
        {fridgeState.data &&
          fridgeState.data.map((item) => {
            return (
              <Sliders key={item.id} listItem={item} opened={() => open()} />
            )
          })}
      </div>
    </>
  )
}
