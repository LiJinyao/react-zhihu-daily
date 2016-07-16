import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import StoryList from './containers/StoryList';
import Story from './containers/Sotry';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={StoryList} />
        <Route path="/news/:id" component={Story} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
