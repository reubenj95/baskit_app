import type { ThunkAction } from '../store'
import { PantryItem, FridgeItem } from '../../models/pantryItems'

import {
  addItemToFridgeList,
  fetchFridgeItems,
  fetchLatestFridgeList,
  removeFromFridgeList,
} from '../APIs/fridge'
import { parseFridgeInput } from '../helpers/componentHelpers'
import { createPantryItem } from './pantryList'
import { addToFridgeList } from './fridgeList'

export const REQUEST_FRIDGE_ITEMS = 'REQUEST_FRIDGE_ITEMS'
export const RECEIVE_FRIDGE_ITEMS = 'RECEIVE_FRIDGE_ITEMS'
export const FAILURE_FRIDGE_ITEMS = 'FAILURE_FRIDGE_ITEMS'

export type FridgeItemAction =
  | { type: typeof REQUEST_FRIDGE_ITEMS }
  | { type: typeof RECEIVE_FRIDGE_ITEMS; payload: PantryItem[] }
  | { type: typeof FAILURE_FRIDGE_ITEMS; payload: string }

export function requestFridgeItems(): FridgeItemAction {
  return {
    type: REQUEST_FRIDGE_ITEMS,
  }
}

export function receiveFridgeItems(
  fridgeItems: PantryItem[]
): FridgeItemAction {
  return {
    type: RECEIVE_FRIDGE_ITEMS,
    payload: fridgeItems,
  }
}

export function failureFridgeItems(errorMessage: string): FridgeItemAction {
  return {
    type: FAILURE_FRIDGE_ITEMS,
    payload: errorMessage,
  }
}

export function addToFridgeListCombined(input: string): ThunkAction {
  return async (dispatch, getState) => {
    const { pantryList } = getState()
    if (pantryList.data) {
      const names = pantryList.data.map((item) => item.name)
      const selectedItem = names.find((name) => name === input)
      if (selectedItem) {
        const existingItem = pantryList.data.filter(
          (item) => item.name === selectedItem
        )
        const listId = await fetchLatestFridgeList()
        const response = await addItemToFridgeList(
          listId.id,
          existingItem[0].id
        )
        await dispatch(receiveFridgeItems(response))
      } else {
        const newItem = parseFridgeInput(input)
        const itemId = await dispatch(createPantryItem(newItem))
        await dispatch(addToFridgeList(itemId[0]))
      }
    }
  }
}
