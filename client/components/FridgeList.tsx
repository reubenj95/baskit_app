import {
  Autocomplete,
  Button,
  Center,
  Divider,
  Flex,
  Space,
  Title,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { addToFridgeList, fetchFridgeList } from '../actions/fridgeList'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Sliders } from './FridgeSliders'
import { fetchPantryList, createPantryItem } from '../actions/pantryList'
import { parseFridgeInput } from '../helpers/componentHelpers'
import { addToFridgeListCombined } from '../actions/addToFridge'

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

  function handleAddItem(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    dispatch(addToFridgeListCombined(input))
    clearInput()
  }

  function clearInput() {
    setInput('')
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
