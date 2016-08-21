import { zhihuAPI } from '../statics';
import fetch from 'isomorphic-fetch';
export const REQUEST_EXPLORE = 'REQUEST_EXPLORE';

export function requestThemes() {
  return { type: REQUEST_EXPLORE };
}

export const RECEIVE_EXPLORE = 'RECEIVE_EXPLORE';

export function receiveThemes(explore) {
  return {
    type: RECEIVE_EXPLORE,
    explore,
  };
}

export const RECEIVE_EXPLORE_ERROR = 'RECEIVE_EXPLORE_ERROR';

export function receiveThemesError(errorMessage) {
  return {
    type: RECEIVE_EXPLORE_ERROR,
    errorMessage,
  };
}

export const INVALIDATE_EXPLORE = 'INVALIDATE_EXPLORE';

export function invalidateThemes() {
  return {
    type:          INVALIDATE_EXPLORE,
    didInvalidate: true,
  };
}

function shouldFetchThemes(state) {
  const explore = state.explore.cache;
  if (!explore) {
    return true;
  } else if (state.isFetching) {
    return false;
  }
  return state.didInvalidate;
}
export function fetchThemesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchThemes(getState())) {
      dispatch(requestThemes());
      return fetch(`${zhihuAPI}/explore`)
      .then((response) => {
        if (response.ok) {
          response.json()
          .then(json => {
            dispatch(receiveThemes(json));
            // 因为知乎日报API设计的原因不得不全部请求才能的得到大图地址
            // json.others.forEach((item) => { dispatch(fetchThemeIfNeeded(item.id)); });
          });
        } else {
          throw new Error(response.status);
        }
      })
      .catch(error => (dispatch(receiveThemesError(error.message))));
    }
    return null;
  };
}
