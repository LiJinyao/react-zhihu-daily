import { zhihuAPI } from '../statics';
import fetch from 'isomorphic-fetch';

export const REQUEST_CIRCLE_STORY_EXTRA = 'REQUEST_CIRCLE_STORY_EXTRA';

export function requestCircleStoryExtra() {
  return { type: REQUEST_CIRCLE_STORY_EXTRA };
}

export const REVEIVE_CIRCLE_STORY_EXTRA = 'REVEIVE_CIRCLE_STORY_EXTRA';
export function receiveCircleStoryExtra(storyExtra, id) {
  return {
    type: REVEIVE_CIRCLE_STORY_EXTRA,
    storyExtra,
    id,
  };
}

export const REVEIVE_CIRCLE_STORY_EXTRA_ERROR = 'REVEIVE_CIRCLE_STORY_EXTRA_ERROR';
export function receiveCircleStoryExtraError(errorMessage) {
  return {
    type: REVEIVE_CIRCLE_STORY_EXTRA_ERROR,
    errorMessage,
  };
}

function sholdFetchCircleStoryExtra(state, id) {
  const cache = state.circleStoryExtra.cache;
  if (cache.has(id)) {
    return false;
  }
  return true;
}
export function fetchCircleStoryExtraIfNeeded(id) {
  return (dispatch, getState) => {
    if (sholdFetchCircleStoryExtra(getState(), id)) {
      dispatch(requestCircleStoryExtra());
      return fetch(`${zhihuAPI}?url=https://news-at.zhihu.com/api/7/circle/${id}`)
      .then(res => {
        if (res.ok) {
          res.json()
          .then(json => {
            dispatch(receiveCircleStoryExtra(json, id));
          });
        } else {
          throw new Error(res.status);
        }
      })
      .catch(error => dispatch(receiveCircleStoryExtraError(error.message)));
    }
    return null;
  };
}
