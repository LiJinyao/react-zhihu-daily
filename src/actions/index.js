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

/*
begin to request news.
 */
export const REQUEST_NEWS = 'REQUEST_NEWS';

export function requestNews(date) {
  return {
    type: REQUEST_NEWS,
    date,
  };
}

/*
news request comes through.
 */
export const RECEIVE_NEWS = 'RECEIVE_NEWS';

export function reciveNews(date, news) {
  return {
    type: RECEIVE_NEWS,
    date,
    news,
    receivedAt: Date.now(),
  };
}

/*
Network error while reciving news.
 */
export const RECEIVE_NEWS_ERROR = 'RECEIVE_NEWS_ERROR';

export function reciveNewsError(errorMessage) {
  return {
    type: RECEIVE_NEWS_ERROR,
    errorMessage,
  };
}
// Thunk action creator

export function fetchNews(date) {
// Thunk middleware knows how to handle functions.
// It passes the dispatch method as an argument to the function,
// thus making it able to dispatch actions itself.
  return (dispatch, getState) => {
// First dispatch: the app state is updated to inform
// that the API call is starting.
    if (! getState().news.cachedDays.has(date)) {
      dispatch(requestNews(date));
      // The function called by the thunk middleware can return a value,
      // that is passed on as the return value of the dispatch method.

      // In this case, we return a promise to wait for.
      // This is not required by thunk middleware, but it is convenient for us.
      return fetch(`${zhihuAPI}http://news-at.zhihu.com/api/4/news/${date}`)
      .then(response => {
        // if (response.status >= 400) {
        //   throw new Error('Bad response from server');
        // }
        if (response.ok) {
          response.json()
          .then(json => dispatch(reciveNews(date, json)));
        } else {
          throw new Error(response.status);
        }
      })
      .catch(error => (dispatch(reciveNewsError(error.message))));
    }
    return null;
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
