import { zhihuAPI } from '../statics';
import fetch from 'isomorphic-fetch';

export const REQUEST_CIRCLE_STORIES = 'REQUEST_CIRCLE_STORIES';

export function requestCircleStories() {
  return { type: REQUEST_CIRCLE_STORIES };
}

export const REVEIVE_CIRCLE_STORIES = 'REVEIVE_CIRCLE_STORIES';
export function receiveCircleStories(stories, id) {
  return {
    type: REVEIVE_CIRCLE_STORIES,
    stories,
    id,
  };
}

export const REVEIVE_CIRCLE_STORIES_ERROR = 'REVEIVE_CIRCLE_STORIES_ERROR';
export function receiveCircleStoriesError(errorMessage) {
  return {
    type: REVEIVE_CIRCLE_STORIES_ERROR,
    errorMessage,
  };
}

function sholdFetchCircleStories(state, id) {
  const cache = state.circleStories.cache;
  if (cache.has(id)) {
    return false;
  }
  return true;
}
export function fetchCircleStoriesIfNeeded(id) {
  return (dispatch, getState) => {
    if (sholdFetchCircleStories(getState(), id)) {
      dispatch(requestCircleStories());
      return fetch(`${zhihuAPI}?url=https://news-at.zhihu.com/api/7/circle/${id}/stories`)
      .then(res => {
        if (res.ok) {
          res.json()
          .then(json => {
            dispatch(receiveCircleStories(json, id));
          });
        } else {
          throw new Error(res.status);
        }
      })
      .catch(error => dispatch(receiveCircleStoriesError(error.message)));
    }
    return null;
  };
}
