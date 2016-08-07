import { zhihuAPI } from '../statics';
import fetch from 'isomorphic-fetch';
/*
Show a story.
 */
export const REQUEST_STORY = 'REQUEST_STORY';

export function requestStory(id) {
  return {
    type: REQUEST_STORY,
    id,
  };
}

export const RECEIVE_STORY = 'RECEIVE_STORY';

export function receiveStory(story, id) {
  return {
    type: RECEIVE_STORY,
    story,
    id,
  };
}

export const RECEIVE_STORY_ERROR = 'RECEIVE_STORY_ERROR';

export function receiveStoryError(errorMessage) {
  return {
    type: RECEIVE_STORY_ERROR,
    errorMessage,
  };
}

export function fetchStory(id) {
  return dispatch => {
    dispatch(requestStory(id));
    return fetch(`${zhihuAPI}http://news-at.zhihu.com/api/4/news/${id}`)
      .then(response => {
        if (response.ok) {
          response.json()
          .then(json => dispatch(receiveStory(json, id)));
        } else {
          throw new Error(response.status);
        }
      })
      .catch(error => (dispatch(receiveStoryError(error.message))));
  };
}
