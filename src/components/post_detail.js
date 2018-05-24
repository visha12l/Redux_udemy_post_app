import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPostDetails, deletePost } from '../actions/index.js';

class PostDetails extends Component {

  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.fetchPostDetails(postId);
  }

  onDelete(id) {
    // debugger
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    }); //passing callback
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
                >Delete Post</button>
              <h4>Title:: {post.title}</h4>
              <p>categories::{post.categories}</p>
              <p>Content::{post.content}</p>
            </div>
        }
      </div>
    );
  }

}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect (mapStateToProps, {fetchPostDetails: fetchPostDetails, deletePost: deletePost}) (PostDetails);
