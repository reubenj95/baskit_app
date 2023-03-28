import type { ThunkAction } from '../store'
import { PantryItem } from '../../models/pantryItems'

import { fetchPantryItems } from '../APIs/pantry'

export const REQUEST_PANTRY_ITEMS = 'REQUEST_PANTRY_ITEMS'
export const RECEIVE_PANTRY_ITEMS = 'RECEIVE_PANTRY_ITEMS'
export const FAILURE_PANTRY_ITEMS = 'FAILURE_PANTRY_ITEMS'

export type PantryItemAction =
  | { type: typeof REQUEST_PANTRY_ITEMS }
  | { type: typeof RECEIVE_PANTRY_ITEMS; payload: PantryItem[] }
  | { type: typeof FAILURE_PANTRY_ITEMS; payload: string }

export function requestPantryItems(): PantryItemAction {
  return {
    type: REQUEST_PANTRY_ITEMS,
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

export function fetchPantryList(): ThunkAction {
  return (dispatch) => {
    dispatch(requestPantryItems())
    return fetchPantryItems()
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
