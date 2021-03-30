import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import { connect } from 'react-redux';

class TaskEdit extends PureComponent {

    handleFormSubmit(formProps) {
        const {editTask, closeModal} = this.props;
        editTask(formProps);
        closeModal()
    }

    renderFieldText = ({ input, label, meta: { touched, error } }) => (
        <div>
            <label>{label}</label>
            <div>
              <textarea className="form-control" {...input} placeholder={label}></textarea>
                {touched && error && <span className="text-danger">{error}</span>}
            </div>
        </div>
    );

    renderError() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <string>Oops! {this.props.errorMessage}</string>
                </div>
            );
        }
    }

    render() {
        const { handleSubmit, submitting, closeModal, task } = this.props;
        return (
            <form initialvalues={task}  onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                  <Field className="form-control" name="status" component="select">
                    <option />
                    <option value={0}>not completed</option>
                    <option value={1}>not completed, edited by admin</option>
                    <option value={10}>completed</option>
                    <option value={11}>edited by admin and done</option>
                  </Field>
                </fieldset>
                <fieldset className="form-group">
                    <Field
                        name="text"
                        label="Text"
                        component={this.renderFieldText}
                        type="text" />
                </fieldset>
                {this.renderError()}
                <button type="submit" className="btn btn-primary" disabled={submitting}>Edit task</button>
                <button onClick={closeModal} type="button" className="btn ml20" disabled={submitting}>Cancel</button>
            </form>
        );
    }
}

const validate = values => {
    const errors = {};

    if (!values.text) {
        errors.text = 'Please enter a text';
    }

    return errors;
};

const mapStateToProps = (state, props) => {
    return {
      errorMessage: state.auth.error,
      initialValues: props.task
    }
};

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'taskEditor',
  validate
})(TaskEdit))
