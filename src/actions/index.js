import { zhihuAPI } from '../statics';
/*
Show a story
 */
export const READ_STORY = 'READ_STORY';

export function readStory(id) {
  return {
    type: READ_STORY,
    id
  }
}

/*
begain to request news
 */
export const REQUEST_NEWS = 'REQUEST_NEWS';

export function requestNews(date) {
  return {
    type: REQUEST_NEWS,
    date
  }
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
    receivedAt: Date.now()
  }
}

// Thunk action creator

export function fetchNews(date){

// Thunk middleware knows how to handle functions.
// It passes the dispatch method as an argument to the function,
// thus making it able to dispatch actions itself.

  return function (dispatch) {

// First dispatch: the app state is updated to inform
// that the API call is starting.

    dispatch(requestNews(date));
    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    return fetch(`${zhihuAPI}http://news-at.zhihu.com/api/4/news/${date}`)
    .then(response => response.json())
    .then(json => dispatch(reciveNews(date, json)));
  }
}
