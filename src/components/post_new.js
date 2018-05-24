import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'; // reduxForm is similar to connect helper
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

class PostNew extends Component {
  onSubmit(values) { // custom onSubmit for api calls
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });// passing callback to createPost action
  }

  renderField(field) {
    return (
      <div className={`form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`}>
        <label>{field.label}</label>
        <input
          className="form-control"
          {...field.input}
        />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
    // {field.meta.error} have value added from validate function
  }

  render() {
    // redux form does not submit data to backend
    // hence we have writter custom onSubmit function
    const { handleSubmit } = this.props; // this props comes in from redux form
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Content"
          name="content"
          component={this.renderField}
        />
        <Link to="/" className="btn btn-danger">Cancel</Link>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

PostNew.defaultProps = {
  handleSubmit: undefined,
  createPost: undefined,
};

PostNew.propTypes = {
  handleSubmit: PropTypes.func,
  createPost: PropTypes.func,
};

function validate(values) { // it contain all the values from form as a object
  const errors = {};
  // if error  is empty the form can be submitted
  if (!values.title) {
    errors.title = 'Enter a title!';
  }
  if (!values.categories) {
    errors.categories = 'Enter a categories!';
  }
  if (!values.content) {
    errors.content = 'Enter a content!';
  }
  return errors;
}

export default reduxForm({ validate, form: 'PostsNewForm' })(connect(null, { createPost })(PostNew));
