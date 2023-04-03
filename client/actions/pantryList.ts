import type { ThunkAction } from '../store'
import { FridgeItem, PantryItem } from '../../models/pantryItems'

import api from '../APIs/pantry'

export const REQUEST_PANTRY_ITEMS = 'REQUEST_PANTRY_ITEMS'
export const RECEIVE_PANTRY_ITEMS = 'RECEIVE_PANTRY_ITEMS'
export const FAILURE_PANTRY_ITEMS = 'FAILURE_PANTRY_ITEMS'
export const SEND_PANTRY_ITEMS = 'SEND_PANTRY_ITEMS'

export type PantryItemAction =
  | { type: typeof REQUEST_PANTRY_ITEMS }
  | { type: typeof RECEIVE_PANTRY_ITEMS; payload: PantryItem[] }
  | { type: typeof FAILURE_PANTRY_ITEMS; payload: string }
  | { type: typeof SEND_PANTRY_ITEMS }

export function requestPantryItems(): PantryItemAction {
  return {
    type: REQUEST_PANTRY_ITEMS,
  }
}

export function sendPantryItems(): PantryItemAction {
  return {
    type: SEND_PANTRY_ITEMS,
  }
}

export function receivePantryItems(
  PantryItems: PantryItem[]
): PantryItemAction {
  return {
    type: RECEIVE_PANTRY_ITEMS,
    payload: PantryItems,
  }
}

export function failurePantryItems(errorMessage: string): PantryItemAction {
  return {
    type: FAILURE_PANTRY_ITEMS,
    payload: errorMessage,
  }
}

function fetchPantryList(): ThunkAction {
  return (dispatch) => {
    dispatch(requestPantryItems())
    return api
      .fetchPantryItems()
      .then((pantryItems) => {
        dispatch(receivePantryItems(pantryItems))
      })
      .catch((err) => {
        if (err instanceof Error) {
          dispatch(failurePantryItems(err.message))
        } else {
          dispatch(failurePantryItems('An unknown error occurred'))
        }
      })
  }
}

function addToPantry(newItem: FridgeItem): ThunkAction<number[]> {
  return (dispatch) => {
    dispatch(requestPantryItems())
    return api
      .addToPantry(newItem)
      .then((response) => {
        dispatch(receivePantryItems(response[1]))
        return response[0]
      })
      .catch((err) => {
        if (err instanceof Error) {
          dispatch(failurePantryItems(err.message))
        } else {
          dispatch(failurePantryItems('An unknown error occurred'))
        }
      })
  }
}

function deleteFromPantry(itemId: number): ThunkAction {
  return async (dispatch) => {
    try {
      await dispatch(requestPantryItems())
      const response = await api.deletePantryItem(itemId)
      await dispatch(receivePantryItems(response))
    } catch (err) {
      if (err instanceof Error) {
        dispatch(failurePantryItems(err.message))
      } else {
        dispatch(failurePantryItems('An unknown error occurred'))
      }
    }
  }
}

export default {
  addToPantry,
  fetchPantryList,
  deleteFromPantry,
}
