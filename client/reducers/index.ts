import { combineReducers } from 'redux'

import fridgeList from './fridge'
import pantryList from './pantry'
import onePantryItem from './pantrySingle'

export default combineReducers({
  fridgeList,
  pantryList,
  onePantryItem,
})
