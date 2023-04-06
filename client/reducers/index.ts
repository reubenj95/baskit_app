import { combineReducers } from 'redux'

import fridgeList from './fridge'
import pantryList from './pantry'
import categories from './categories'

export default combineReducers({
  fridgeList,
  pantryList,
  categories,
})
