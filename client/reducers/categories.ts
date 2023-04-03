import {
  CategoryAction,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  FAILURE_CATEGORIES,
} from '../actions/categories'
import { Category } from '../../models/pantryItems'

const initialState: CategoryState = {
  data: [],
  isLoading: false,
  error: null,
}
type CategoryState = {
  data: Category[] | undefined
  error: string | null
  isLoading: boolean
}

function fridgeList(
  state = initialState,
  action: CategoryAction
): CategoryState {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        error: null,
        data: action.payload,
        isLoading: false,
      }
    case REQUEST_CATEGORIES:
      return {
        error: null,
        data: [],
        isLoading: true,
      }
    case FAILURE_CATEGORIES:
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
