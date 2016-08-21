import { zhihuAPI } from '../statics';
import fetch from 'isomorphic-fetch';


export const REQUEST_STORY_EXTRA = 'REQUEST_STORY_EXTRA';

export function requestStoryExtra(id) {
  return {
    type: REQUEST_STORY_EXTRA,
    id,
  };
}

export const RECEIVE_STORY_EXTRA = 'RECEIVE_STORY_EXTRA';

export function receiveStoryExtra(id, extra) {
  return {
    type: RECEIVE_STORY_EXTRA,
    id,
    extra,
  };
}

export const RECEIVE_STORY_EXTRA_ERROR = 'RECEIVE_STORY_EXTRA_ERROR';

export function receiveStoryExtraError(id, errorMessage) {
  return {
    type: RECEIVE_STORY_EXTRA,
    id,
    errorMessage,
  };
}

export function fetchStoryExtra(id) {
  return (dispatch, getState) => {
    if (!getState().storyExtra.extraCache.has(id)) {
      dispatch(requestStoryExtra(id));
      return fetch(`${zhihuAPI}?url=http://news-at.zhihu.com/api/4/story-extra/${id}`)
      .then(response => {
        if (response.ok) {
          response.json()
          .then(json => dispatch(receiveStoryExtra(id, json)));
        } else {
          throw new Error(response.status);
        }
      })
      .catch(error => (dispatch(receiveStoryExtraError(id, error.message))));
    }
    return null;
  };
}
