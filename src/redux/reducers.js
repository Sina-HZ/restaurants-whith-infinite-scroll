import { combineReducers } from 'redux'
import { RECIEVE_RESTAURANT ,RECEIVE_FILTERS,INITIAL_RECIEVE_RESTAURANT } from './actions'


function filters(
  state = [],
  action,
) {
  switch (action.type) {
    case RECEIVE_FILTERS:
      return [...state,...action.payload]
    default:
      return state
  }
}

function vendors(state = [], action) {
  switch (action.type) {
    case INITIAL_RECIEVE_RESTAURANT:
      console.log('initial_recieve: ',[...action.payload])
      return [...action.payload];
    case RECIEVE_RESTAURANT:
      return [...state,...action.payload];
    default:
      return state
  }
}

const rootReducer = combineReducers({
  filters,
  vendors
})

export default rootReducer