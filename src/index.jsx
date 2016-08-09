import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import StoryList from './containers/StoryList';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// 按需加载
const Story = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./containers/Sotry').default);
  }, '/news/:id');
};

const Explore = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./containers/ExploreContainer').default);
  }, '/explore');
};

const ThemeStories = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./components/Explore/Theme/ThemeStories').default);
  }, '/ThemeStories');
};

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={StoryList} />
        <Route path="/news/:id" getComponent={Story} />
        <Route path="/explore" getComponent={Explore} />
        <Route path="/explore/:id" getComponent={ThemeStories} />
        <Route path="/explore/story/:id" getComponent={Story} />
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
