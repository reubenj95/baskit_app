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
import fridgeAction from '../actions/fridgeList'
import { useAppDispatch, useAppSelector } from '../hooks'
import FridgeSliders from './FridgeSliders'
import pantryAction from '../actions/pantryList'

export default function FridgeList() {
  const fridgeState = useAppSelector((state) => state.fridgeList)
  const pantryState = useAppSelector((state) => state.pantryList)
  const [opened, { open, close }] = useDisclosure(false)
  const [input, setInput] = useState('')
  const [options, setOptions] = useState([] as string[])
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fridgeAction.fetchFridgeList())
    dispatch(pantryAction.fetchPantryList())
  }, [dispatch])

  useEffect(() => {
    updateOptions()
  }, [pantryState.data, fridgeState.data])

  function handleAddItem(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    dispatch(fridgeAction.addItemToFridgeList(input))
    clearInput()
  }

  function clearInput() {
    setInput('')
  }

  function updateOptions() {
    if (pantryState.data && fridgeState.data) {
      const pantryItems = pantryState.data.map((item) => item.name)
      const fridgeItems = fridgeState.data.map((item) => item.name)
      const data = pantryItems.filter((item) => {
        return !fridgeItems.some((element) => element == item)
      })
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
                id="fridge-item"
                name="fridge-item"
                aria-label="enter item"
                value={input}
                onChange={setInput}
                data={options}
              />
              <Space h="sm" />
              <Button variant="outline" type="submit" alt-text="submit">
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
              <FridgeSliders
                key={item.id}
                listItem={item}
                opened={() => open()}
              />
            )
          })}
      </div>
    </>
  )
}
