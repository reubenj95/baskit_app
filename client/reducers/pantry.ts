import {
  PantryItemAction,
  REQUEST_PANTRY_ITEMS,
  RECEIVE_PANTRY_ITEMS,
  FAILURE_PANTRY_ITEMS,
  SEND_PANTRY_ITEMS,
} from '../actions/pantryList'
import { FridgeItem, PantryItem } from '../../models/pantryItems'

const initialState: PantryState = {
  data: [],
  isLoading: false,
  error: null,
}

// STRETCH: use discriminated unions to make this type more specific
type PantryState = {
  data: PantryItem[] | undefined
  error: string | null
  isLoading: boolean
}

function pantryList(
  state = initialState,
  action: PantryItemAction
): PantryState {
  switch (action.type) {
    case RECEIVE_PANTRY_ITEMS:
      return {
        error: null,
        data: action.payload,
        isLoading: false,
      }
    case SEND_PANTRY_ITEMS:
      return {
        error: null,
        data: [],
        isLoading: true,
      }
    case REQUEST_PANTRY_ITEMS:
      return {
        error: null,
        data: [],
        isLoading: true,
      }
    case FAILURE_PANTRY_ITEMS:
      return {
        error: action.payload,
        data: [],
        isLoading: false,
      }
    default:
      return state
  }
}

export default pantryList
