import { zhihuAPI } from '../statics';
import fetch from 'isomorphic-fetch';

export const REQUEST_THEME = 'REQUEST_THEME';

export function requestTheme(id) {
  return {
    type: REQUEST_THEME,
    id,
  };
}

export const RECEIVE_THEME = 'RECEIVE_THEME';

export function receiveTheme(id, theme) {
  return {
    type: RECEIVE_THEME,
    theme,
    id,
  };
}

export const RECEIVE_THEME_ERROR = 'RECEIVE_THEME_ERROR';

export function receiveThemeError(id, errorMessage) {
  return {
    type: RECEIVE_THEME_ERROR,
    errorMessage,
    id,
  };
}

function shouldFetchTheme(id, state) {
  return !state.theme.themeCache.has(id);
}
export function fetchThemeIfNeeded(id) {
  return (dispatch, getState) => {
    if (shouldFetchTheme(id, getState())) {
      console.log("fetch" + id);
      dispatch(requestTheme(id));
      return fetch(`${zhihuAPI}http://news-at.zhihu.com/api/4/theme/${id}`)
      .then((response) => {
        if (response.ok) {
          response.json()
          .then(json => dispatch(receiveTheme(id, json)));
        } else {
          throw new Error(response.status);
        }
      })
      .catch(error => (dispatch(receiveThemeError(id, error.message))));
    }
    return null;
  };
}
