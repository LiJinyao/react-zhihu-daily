import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import StoryList from './containers/StoryList';
import Story from './containers/Sotry';
import Explore from './containers/ExploreContainer';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={StoryList} />
        <Route path="/news/:id" component={Story} />
        <Route path="/explore" component={Explore} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

var buglog = document.createElement("div");

window.onerror = function(message, source, lineno, colno, error) {
  // show error on page.
  var bugMessage = document.createElement("div");
  bugMessage.innerHTML = `<p>${message}</p>
  <p>${source}</p>
  <p>${lineno}</p>
  <p>${colno}</p>
  <p>${error}</p>
  `;
  document.body.appendChild(bugMessage);
};
