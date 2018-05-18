import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form'; //reduxForm is similar to connect helper

class PostNew extends Component {

  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          {...field.input}
        />
        {field.meta.error}
      </div>
    )

    //{field.meta.error}  have value added from validate function
  }

  onSubmit(values) { //custom onSubmit for api calls
    console.log(values)
  }

  render() {
    //redux form does not submit data to backend
    //hence we have writter custom onSubmit function
    const { handleSubmit } = this.props; //this props comes in from redux form
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
        <button type="submit" className="btn btn-primary">Cancel</button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }

}

function validate(values) { //it contain all the values from form as a object
    const errors = {};
    //ir error  is empty the form can be submitted
    if(!values.title) {
      errors.title = "Enter a title!";
    }
    if(!values.categories) {
      errors.categories = "Enter a categories!";
    }
    if(!values.content) {
      errors.content = "Enter a content!";
    }
    return errors;
}

export default reduxForm ({
    validate: validate,
    form: 'PostsNewForm' //it work as a name of the form
}) (PostNew);
