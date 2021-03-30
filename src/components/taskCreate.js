import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import { connect } from 'react-redux';

class TaskCreate extends PureComponent {

    handleFormSubmit(formProps) {
        const {createTask, closeModal} = this.props;
        console.log(this.props)
        createTask(formProps);
        closeModal()
    }

    renderField = ({ input, label, type, meta: { touched, error } }) => (
        <div>
            <label>{label}</label>
            <div>
                <input className="form-control" {...input} placeholder={label} type={type} />
                {touched && error && <span className="text-danger">{error}</span>}
            </div>
        </div>
    );

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
        const { handleSubmit, submitting, closeModal } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                  <Field
                    name="username"
                    label="Username"
                    component={this.renderField}
                    type="text" />
                </fieldset>
                <fieldset className="form-group">
                    <Field
                        name="email"
                        label="Email"
                        component={this.renderField}
                        type="text" />
                </fieldset>
                <fieldset className="form-group">
                    <Field
                        name="text"
                        label="Text"
                        component={this.renderFieldText}
                        type="text" />
                </fieldset>
                {this.renderError()}
                <button type="submit" className="btn btn-primary" disabled={submitting}>Add task</button>
                <button onClick={closeModal} type="button" className="btn ml20" disabled={submitting}>Cancel</button>
            </form>
        );
    }
}

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Please enter an email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.username) {
        errors.username = 'Please enter an username';
    }

    if (!values.text) {
        errors.text = 'Please enter a text';
    }

    return errors;
};

const mapStateToProps = (state) => {
    return { errorMessage: state.auth.error }
};

export default reduxForm({
    form: 'taskEditor',
    validate
})(connect(mapStateToProps, actions)(TaskCreate));
