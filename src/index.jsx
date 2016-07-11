import React from 'react';
import { render } from 'react-dom';
import App from './components/app';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { fetchNews } from './actions';
import rootReducer from './reducers';
/*
Use Browser History
 */
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>,
  document.getElementById('root')
);

const store = createStore( rootReducer, applyMiddleware(thunkMiddleware));

store.dispatch(fetchNews('latest'))
.then(() => console.log(store.getState()));
