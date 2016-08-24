import { zhihuAPI } from '../statics';
import fetch from 'isomorphic-fetch';
export const REQUEST_EXPLORE = 'REQUEST_EXPLORE';

export function requestExplore() {
  return { type: REQUEST_EXPLORE };
}

export const RECEIVE_EXPLORE = 'RECEIVE_EXPLORE';

export function receiveExplore(explore) {
  return {
    type: RECEIVE_EXPLORE,
    explore,
  };
}

export const RECEIVE_EXPLORE_ERROR = 'RECEIVE_EXPLORE_ERROR';

export function receiveExploreError(errorMessage) {
  return {
    type: RECEIVE_EXPLORE_ERROR,
    errorMessage,
  };
}

export const INVALIDATE_EXPLORE = 'INVALIDATE_EXPLORE';

export function invalidateExplore() {
  return {
    type:          INVALIDATE_EXPLORE,
    didInvalidate: true,
  };
}

function shouldFetchExplore(state) {
  const explore = state.explore.cache;
  if (!explore) {
    return true;
  } else if (state.isFetching) {
    return false;
  }
  return state.didInvalidate;
}
export function fetchExploreIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchExplore(getState())) {
      dispatch(requestExplore());
      return fetch(`${zhihuAPI}/explore`)
      .then((response) => {
        if (response.ok) {
          response.json()
          .then(json => {
            dispatch(receiveExplore(json));
          });
        } else {
          throw new Error(response.status);
        }
      })
      .catch(error => (dispatch(receiveExploreError(error.message))));
    }
    return null;
  };
}
