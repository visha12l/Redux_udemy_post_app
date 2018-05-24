import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import PostIndex from './components/post_index';
import PostNew from './components/post_new';
import PostDetails from './components/post_detail';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <div>
        <Route exact path="/posts/new" component={PostNew} />
        <Route exact path="/posts/:id" component={PostDetails} />
        <Route exact path="/" component={PostIndex} />
      </div>
    </Router>
  </Provider>
  , document.querySelector('.container'),
);
