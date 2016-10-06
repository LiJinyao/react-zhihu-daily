import { combineReducers } from 'redux';
import {
  REQUEST_NEWS,
  RECEIVE_NEWS,
  REQUEST_STORY,
  RECEIVE_STORY,
  RECEIVE_NEWS_ERROR,
  RECEIVE_STORY_ERROR,
  REQUEST_STORY_EXTRA,
  RECEIVE_STORY_EXTRA,
  RECEIVE_STORY_EXTRA_ERROR,
  REQUEST_EXPLORE,
  RECEIVE_EXPLORE,
  RECEIVE_EXPLORE_ERROR,
  INVALIDATE_EXPLORE,
  REQUEST_CIRCLE_STORIES,
  REVEIVE_CIRCLE_STORIES,
  REVEIVE_CIRCLE_STORIES_ERROR,
  REQUEST_CIRCLE_STORY_EXTRA,
  REVEIVE_CIRCLE_STORY_EXTRA,
  REVEIVE_CIRCLE_STORY_EXTRA_ERROR,
  // REQUEST_THEME,
  // RECEIVE_THEME,
  // RECEIVE_THEME_ERROR,
 } from '../actions';

/**
 * @param  {[Set]}  cachedDays: 记录获取新闻的日期。每次下载到新闻都在这里add新闻的日期。
 *                             避免重复下载相同日期的新闻。每次下载新闻前先通过cachedDay检查是否已经存在那天的新闻。
 */
function news(state = {
  fetchError: false,
  isFetching: false,
  items:      [],
  cachedDays: new Set(),
}, action) {
  switch (action.type) {
    case REQUEST_NEWS:
      return Object.assign({}, state, { isFetching: true, fetchError: false });
    case RECEIVE_NEWS:
      return Object.assign({}, state, {
        fetchError:  false,
        isFetching:  false,
        items:       [
          ...state.items,
          action.news,
        ],
        lastUpdated: action.receivedAt,
        cachedDays:  new Set(state.cachedDays).add(action.date),
      });
    case RECEIVE_NEWS_ERROR:
      return Object.assign({}, state, {
        isFetching:   false,
        fetchError:   true,
        errorMessage: action.errorMessage,
      });
    default:
      return state;
  }
}

/**
 * 所有story的具体内容作为一个map存放在这里
 * story被以map的形式储存在storyCache中。使用的时候先检查story是否被chache。
 * @param  {[type]} state =             {  storyCache: new Map( [description]
 * @return {[type]}       [description]
 */
function stories(state = {
  storyCache: new Map(),
  isFetching: false,
  fetchError: false,
}, action) {
  switch (action.type) {
    case REQUEST_STORY:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_STORY:
    // new Map(aMap) is deep copy
      return Object.assign({}, state, {
        storyCache: new Map(state.storyCache).set(action.id, action.story),
        isFetching: false,
        fetchError: false,
      });
    case RECEIVE_STORY_ERROR:
      return Object.assign({}, state, {
        isFetching:   false,
        fetchError:   true,
        errorMessage: action.errorMessage,
      });
    default:
      return state;
  }
}

function storyExtra(state = {
  extraCache: new Map(),
  isFetching: false,
  fetchError: false,
}, action) {
  switch (action.type) {
    case REQUEST_STORY_EXTRA:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_STORY_EXTRA:
      return Object.assign({}, state, {
        extraCache: new Map(state.extraCache).set(action.id, action.extra),
        isFetching: false,
        fetchError: false,
      });
    case RECEIVE_STORY_EXTRA_ERROR:
      return Object.assign({}, state, {
        isFetching:   false,
        fetchError:   true,
        errorMessage: action.errorMessage,
      });
    default:
      return state;

  }
}
function exploreToMap(exp) {
  const hotCircle = new Map();
  exp.hotCirclely
  .filter(item => item.extra.image)
  .map(item => hotCircle.set(item.id, item));
  return hotCircle;
}
// explore list
function explore(state = {
  cache:         new Map(),
  isFetching:    false,
  didInvalidate: true,
  lastUpdated:    0,
  fetchError:     false,
}, action) {
  switch (action.type) {
    case REQUEST_EXPLORE:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_EXPLORE:
      return Object.assign({}, state, {
        isFetching:    false,
        cache:         exploreToMap(action.explore),
        didInvalidate: false,
        fetchError:    false,
      });
    case RECEIVE_EXPLORE_ERROR:
      return Object.assign({}, state, {
        isFetching:   false,
        fetchError:   true,
        errorMessage: action.errorMessage,
      });
    case INVALIDATE_EXPLORE:
      return Object.assign({}, state, {
        didInvalidate: false,
      });
    default:
      return state;
  }
}

function circleStories(state = {
  cache:      new Map(),
  isFetching: false,
  fetchError: false,
}, action) {
  switch (action.type) {
    case REQUEST_CIRCLE_STORIES:
      return Object.assign({}, state, { isFetching: true });
    case REVEIVE_CIRCLE_STORIES:
      return Object.assign({}, state, {
        cache:      new Map(state.cache).set(action.id, action.stories),
        isFetching: false,
        fetchError: false,
      });
    case REVEIVE_CIRCLE_STORIES_ERROR:
      return Object.assign({}, state, {
        isFetching:   false,
        fetchError:   true,
        errorMessage: action.errorMessage,
      });
    default:
      return state;
  }
}
function circleStoryExtra(state = {
  cache:      new Map(),
  isFetching: false,
  fetchError: false,
}, action) {
  switch (action.type) {
    case REQUEST_CIRCLE_STORY_EXTRA:
      return Object.assign({}, state, { isFetching: true });
    case REVEIVE_CIRCLE_STORY_EXTRA:
      return Object.assign({}, state, {
        cache:      new Map(state.cache).set(action.id, action.storyExtra),
        isFetching: false,
        fetchError: false,
      });
    case REVEIVE_CIRCLE_STORY_EXTRA_ERROR:
      return Object.assign({}, state, {
        isFetching:   false,
        fetchError:   true,
        errorMessage: action.errorMessage,
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  news,
  stories,
  storyExtra,
  explore,
  circleStories,
  circleStoryExtra,
});

export default rootReducer;
