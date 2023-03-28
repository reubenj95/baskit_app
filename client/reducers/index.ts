import { combineReducers } from 'redux'

import fridgeList from './fridge'
import pantryList from './pantry'

export default combineReducers({
  fridgeList,
  pantryList,
})
