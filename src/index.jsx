import React from 'react';
import { render } from 'react-dom';
import App from './components/app';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { fetchNews } from './actions';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import Stories from './containers/Stories';
import Story from './components/story'
/*
Use Browser History
 */
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// store.dispatch(fetchNews('latest'))
// .then(() => console.log(store.getState()));

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Stories}/>
        <Route path="/news/:id" component={Story} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
