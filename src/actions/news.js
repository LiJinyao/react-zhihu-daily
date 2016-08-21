import { zhihuAPI } from '../statics';
import fetch from 'isomorphic-fetch';
import { fetchStoryExtra } from './storyExtra';
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
    type:       RECEIVE_NEWS,
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
function shouldFetchNews(state, date) {
  if (state.news.cachedDays.has(date)) {
    return false;
  }
  return !state.news.isFetching;
}
export function fetchNews(date) {
// Thunk middleware knows how to handle functions.
// It passes the dispatch method as an argument to the function,
// thus making it able to dispatch actions itself.
  return (dispatch, getState) => {
// First dispatch: the app state is updated to inform
// that the API call is starting.
    console.log(getState());
    if (shouldFetchNews(getState(), date)) {
      dispatch(requestNews(date));
      // The function called by the thunk middleware can return a value,
      // that is passed on as the return value of the dispatch method.

      // In this case, we return a promise to wait for.
      // This is not required by thunk middleware, but it is convenient for us.
      return fetch(`${zhihuAPI}?url=http://news-at.zhihu.com/api/4/news/${date}`)
      .then(response => {
        // if (response.status >= 400) {
        //   throw new Error('Bad response from server');
        // }
        if (response.ok) {
          response.json()
          .then(json => {
            dispatch(reciveNews(date, json));
            for (let i = 0; i < json.stories.length; i++) {
              dispatch(fetchStoryExtra(json.stories[i].id));
            }
          });
        } else {
          throw new Error(response.status);
        }
      })
      .catch(error => (dispatch(reciveNewsError(error.message))));
    }
    return null;
  };
}
