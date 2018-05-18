import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import PostIndex from './components/post_index';
import PostNew from './components/post_new';
import reducers from './reducers';
import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <div>
        <Route exact path="/" component={PostIndex} />
        <Route exact path="/posts/new" component={PostNew} />
      </div>
    </Router>
  </Provider>
  , document.querySelector('.container'));
