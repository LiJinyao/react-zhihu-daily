import { combineReducers } from 'redux';
import { REQUEST_NEWS, RECEIVE_NEWS, REQUEST_STORY, RECEIVE_STORY } from '../actions';
function news(state = {
  isFetching: false,
  items: [],
}, action) {
  switch (action.type) {
    case REQUEST_NEWS:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_NEWS:
      return Object.assign({}, state, {
        isFetching: false,
        items: [
          ...state.items,
          action.news,
        ],
        lastUpdated: action.receivedAt,
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
}, action) {
  switch (action.type) {
    case REQUEST_STORY:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_STORY:
    // 这里直接修改了原来的map，但是这个map就是一直用来储存下载到的故事，在没有引入immutable之前先这样
    console.log(action);
      return Object.assign({}, state, {
        storyCache: state.storyCache.set(action.id, action.story),
        isFetching: false,
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  news,
  stories,
});

export default rootReducer;
