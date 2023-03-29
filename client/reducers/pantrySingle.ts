import {
  OnePantryItemAction,
  REQUEST_PANTRY_ITEM,
  RECEIVE_PANTRY_ITEM,
  FAILURE_PANTRY_ITEM,
} from '../actions/onePantryItem'
import { PantryItem } from '../../models/pantryItems'

const initialState: PantryState = {
  data: {} as PantryItem,
  isLoading: false,
  error: null,
}

// STRETCH: use discriminated unions to make this type more specific
type PantryState = {
  data: PantryItem | undefined
  error: string | null
  isLoading: boolean
}

function onePantryItem(
  state = initialState,
  action: OnePantryItemAction
): PantryState {
  switch (action.type) {
    case RECEIVE_PANTRY_ITEM:
      return {
        error: null,
        data: action.payload,
        isLoading: false,
      }
    case REQUEST_PANTRY_ITEM:
      return {
        error: null,
        data: {} as PantryItem,
        isLoading: true,
      }
    case FAILURE_PANTRY_ITEM:
      return {
        error: action.payload,
        data: {} as PantryItem,
        isLoading: false,
      }
    default:
      return state
  }
}

export default onePantryItem
