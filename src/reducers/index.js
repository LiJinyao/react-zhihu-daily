import { combineReducers } from 'redux';
import { REQUEST_NEWS, RECEIVE_NEWS } from '../actions';

function news(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_NEWS:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_NEWS:
      return Object.assign({}, state, {
        isFetching: false,
        items: [
          ...state.items,
          action.news
        ],
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  news
});

export default rootReducer;
