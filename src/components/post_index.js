import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';

class PostIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => <li className="list-group-item" key={post.id}><Link to={`/posts/${post.id}`}>{post.title || '-'}</Link></li>);
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">Add a post</Link>
        </div>
        <h3>Posts</h3>
        <ul>{this.renderPosts()}</ul>
      </div>
    );
  }
}

PostIndex.defaultProps = {
  posts: [],
  fetchPosts: undefined,
};

PostIndex.propTypes = {
  posts: PropTypes.arrayOf,
  fetchPosts: PropTypes.func,
};

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostIndex);
