import type { ThunkAction } from '../store'
import { PantryItem } from '../../models/pantryItems'

import { fetchOnePantryItem } from '../APIs/pantry'
import { useAppSelector } from '../hooks'
export const REQUEST_PANTRY_ITEM = 'REQUEST_PANTRY_ITEM'
export const RECEIVE_PANTRY_ITEM = 'RECEIVE_PANTRY_ITEM'
export const FAILURE_PANTRY_ITEM = 'FAILURE_PANTRY_ITEM'

export type OnePantryItemAction =
  | { type: typeof REQUEST_PANTRY_ITEM }
  | { type: typeof RECEIVE_PANTRY_ITEM; payload: PantryItem }
  | { type: typeof FAILURE_PANTRY_ITEM; payload: string }

export function requestOnePantryItem(): OnePantryItemAction {
  return {
    type: REQUEST_PANTRY_ITEM,
  }
}

export function receiveOnePantryItem(
  PantryItem: PantryItem
): OnePantryItemAction {
  return {
    type: RECEIVE_PANTRY_ITEM,
    payload: PantryItem,
  }
}

export function failureOnePantryItem(
  errorMessage: string
): OnePantryItemAction {
  return {
    type: FAILURE_PANTRY_ITEM,
    payload: errorMessage,
  }
}

export function fetchSelectedPantryItem(ItemId: number): ThunkAction {
  return (dispatch) => {
    dispatch(requestOnePantryItem())
    return fetchOnePantryItem(ItemId)
      .then((pantryItem) => {
        dispatch(receiveOnePantryItem(pantryItem))
      })
      .catch((err) => {
        if (err instanceof Error) {
          dispatch(failureOnePantryItem(err.message))
        } else {
          dispatch(failureOnePantryItem('An unknown error occurred'))
        }
      })
  }
}
