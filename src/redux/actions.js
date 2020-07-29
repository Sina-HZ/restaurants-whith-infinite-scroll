export const REQUEST_FILTERS = 'REQUEST_FILTERS'
export const RECEIVE_FILTERS = 'RECEIVE_FILTERS'
export const SELECT_FILTER = 'SELECT_FILTER'
export const RECIEVE_RESTAURANT = 'RECIEVE_RESTAURANT'
export const INITIAL_RECIEVE_RESTAURANT = 'INITIAL_RECIEVE_RESTAURANT'

export function selectFilter(filters) {
  return {
    type: SELECT_FILTER,
    payload: filters,
  }
}

export function fetchRestaurant(restaurant) {
  return {
    type: RECIEVE_RESTAURANT,
    payload: restaurant,
  }
}
export function fetchInitaialRestaurant(restaurant) {
  return {
    type: INITIAL_RECIEVE_RESTAURANT,
    payload: restaurant,
  }
}


export function recieveFilters(filters) {
  return {
    type: RECEIVE_FILTERS,
    payload: filters,
  }
}
