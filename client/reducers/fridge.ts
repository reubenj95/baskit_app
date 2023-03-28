import {
  FridgeItemAction,
  REQUEST_FRIDGE_ITEMS,
  RECEIVE_FRIDGE_ITEMS,
  FAILURE_FRIDGE_ITEMS,
} from '../actions/fridgeList'
import { FridgeItem } from '../../models/pantryItems'

const initialState: FridgeState = {
  data: [],
  isLoading: false,
  error: null,
}

// STRETCH: use discriminated unions to make this type more specific
type FridgeState = {
  data: FridgeItem[] | undefined
  error: string | null
  isLoading: boolean
}

function fridgeList(
  state = initialState,
  action: FridgeItemAction
): FridgeState {
  switch (action.type) {
    case RECEIVE_FRIDGE_ITEMS:
      return {
        error: null,
        data: action.payload,
        isLoading: false,
      }
    case REQUEST_FRIDGE_ITEMS:
      return {
        error: null,
        data: [],
        isLoading: true,
      }
    case FAILURE_FRIDGE_ITEMS:
      return {
        error: action.payload,
        data: [],
        isLoading: false,
      }
    default:
      return state
  }
}

export default fridgeList
