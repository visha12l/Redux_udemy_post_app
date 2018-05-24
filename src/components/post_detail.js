import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPostDetails, deletePost } from '../actions/index';

class PostDetails extends Component {
  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.fetchPostDetails(postId);
  }

  onDelete(id) {
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });// passing callback
  }

  render() {
    const { post } = this.props;
    return (
      <div>
        {this.props.post &&
        <div>
          <Link to="/">BACK TO POST</Link>
          <button
            className="btn btn-danger  pull-xs-right"
            onClick={this.onDelete.bind(this, post.id)}
          >Delete Post
          </button>
          <h4>Title:: {post.title}</h4>
          <p>categories::{post.categories}</p>
          <p>Content::{post.content}</p>
        </div>
        }
      </div>
    );
  }
}

PostDetails.defaultProps = {
  post: [],
  fetchPostDetails: undefined,
  deletePost: undefined,
};

PostDetails.propTypes = {
  post: PropTypes.arrayOf,
  fetchPostDetails: PropTypes.func,
  deletePost: PropTypes.func,
};

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPostDetails, deletePost })(PostDetails);
