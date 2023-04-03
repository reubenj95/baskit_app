import type { ThunkAction } from '../store'
import { PantryItem } from '../../models/pantryItems'
import helper from '../helpers/componentHelpers'
import api from '../APIs/fridge'
import pantryAction from '../actions/pantryList'

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

export function fetchFridgeList(): ThunkAction {
  return (dispatch) => {
    dispatch(requestFridgeItems())
    return api
      .fetchFridgeItems()
      .then((fridgeItems) => {
        dispatch(receiveFridgeItems(fridgeItems))
      })
      .catch((err) => {
        if (err instanceof Error) {
          dispatch(failureFridgeItems(err.message))
        } else {
          dispatch(failureFridgeItems('An unknown error occurred'))
        }
      })
  }
}

export function addItemToFridgeList(input: string): ThunkAction {
  return async (dispatch, getState) => {
    const { pantryList } = getState()
    const listId = await api.fetchLatestFridgeList()
    if (pantryList.data) {
      const names = pantryList.data.map((item) => item.name)
      const selectedItem = names.find((name) => name === input)
      if (selectedItem) {
        const existingItem = pantryList.data.filter(
          (item) => item.name === selectedItem
        )
        const response = await api.addItemToFridgeList(
          listId.id,
          existingItem[0].id
        )
        await dispatch(receiveFridgeItems(response))
      } else {
        const newItem = helper.parseFridgeInput(input)
        const itemId = await dispatch(pantryAction.addToPantry(newItem))
        const response = await api.addItemToFridgeList(
          listId.id,
          Number(itemId[0])
        )
        dispatch(receiveFridgeItems(response))
      }
    }
  }
}

export function deleteFromFridgeList(itemId: number): ThunkAction {
  return (dispatch) => {
    return api
      .fetchLatestFridgeList()
      .then((listId) => {
        return api.removeFromFridgeList(itemId, listId.id)
      })
      .then((fridgeItems) => {
        dispatch(receiveFridgeItems(fridgeItems))
      })
      .catch((err) => {
        dispatch(failureFridgeItems(err.message))
      })
  }
}

export default {
  deleteFromFridgeList,
  addItemToFridgeList,
  fetchFridgeList,
}
