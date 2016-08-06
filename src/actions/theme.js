import { zhihuAPI } from '../statics';
import fetch from 'isomorphic-fetch';

export const REQUEST_THEMES = 'REQUEST_THEMES';

export function requestThemes() {
  return { type: REQUEST_THEMES };
}

export const RECEIVE_THEMES = 'RECEIVE_THEMES';

export function receiveThemes(themes) {
  return {
    type: RECEIVE_THEMES,
    themes,
  };
}

export const RECEIVE_THEMES_ERROR = 'RECEIVE_THEMES_ERROR';

export function receiveThemesError(errorMessage) {
  return {
    type: RECEIVE_THEMES_ERROR,
    errorMessage,
  };
}

export const INVALIDATE_THEMES = 'INVALIDATE_THEMES';

export function invalidateThemes() {
  return {
    type:          INVALIDATE_THEMES,
    didInvalidate: true,
  };
}

function shouldFetchThemes(state) {
  const themes = state.themes.cache;
  if (!themes) {
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
      return fetch(`${zhihuAPI}http://news-at.zhihu.com/api/4/themes`)
      .then((response) => {
        if (response.ok) {
          response.json()
          .then(json => dispatch(receiveThemes(json)));
        } else {
          throw new Error(response.status);
        }
      })
      .catch(error => (dispatch(receiveThemesError(error.message))));
    }
    return null;
  };
}
