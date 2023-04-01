import type { ThunkAction } from '../store'
import { PantryItem, FridgeItem } from '../../models/pantryItems'

import {
  addItemToFridgeList,
  fetchFridgeItems,
  fetchLatestFridgeList,
} from '../APIs/fridge'

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
    return fetchFridgeItems()
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

export function addToFridgeList(newPantryItem: PantryItem): ThunkAction {
  return (dispatch) => {
    return fetchLatestFridgeList()
      .then((listId) => {
        return addItemToFridgeList(listId.id, newPantryItem.id)
      })
      .then((fridgeItems) => {
        dispatch(receiveFridgeItems(fridgeItems))
      })
      .catch((err) => {
        dispatch(failureFridgeItems(err.message))
      })
  }
}
