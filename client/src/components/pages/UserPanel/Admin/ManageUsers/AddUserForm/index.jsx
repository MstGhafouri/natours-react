import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import { Form, Label } from 'semantic-ui-react';

import { addUser } from '../../../../../../redux/actions/user';
import Validator from '../../../../../../validator';

const options = [
  { key: 'u', text: 'User', value: 'user' },
  { key: 'a', text: 'Admin', value: 'admin' },
  { key: 'g', text: 'Guid', value: 'guid' },
  { key: 'l', text: 'Lead guid', value: 'lead-guid' }
];

class AddUserForm extends React.Component {
  renderError = ({ error, touched }) => {
    if (error && touched) {
      return (
        <Label pointing basic size="large" color="orange">
          {error}
        </Label>
      );
    }
  };

  renderInput = ({ input, meta, label, placeholder, type }) => {
    return (
      <Form.Field>
        <label>{label}</label>
        <input
          {...input}
          placeholder={placeholder}
          type={type}
          autoComplete="off"
        />
        {this.renderError(meta)}
      </Form.Field>
    );
  };

  renderSelect = ({
    input,
    type,
    label,
    placeholder,
    meta,
    as: As,
    ...props
  }) => {
    function handleChange(e, { value }) {
      return input.onChange(value);
    }
    return (
      <Form.Field>
        <As
          {...props}
          {...input}
          value={input.value}
          type={type}
          label={label}
          placeholder={placeholder}
          onChange={handleChange}
        />
        {this.renderError(meta)}
      </Form.Field>
    );
  };

  onSubmit = (formValues, dispatch) => {
    this.props.addUser(formValues);
    dispatch(reset('addUser'));
  };

  render() {

    return (
      <div className="custom-form">
        <Form
          size="huge"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          id="addUserForm"
        >
          <Form.Group widths="equal">
            <Field
              name="name"
              component={this.renderInput}
              placeholder="User fullName"
              label="Full name"
              type="text"
              validate={[Validator.required, Validator.twoPartValue]}
            />
            <Field
              name="email"
              component={this.renderInput}
              placeholder="user@mail.com"
              label="Email address"
              type="email"
              validate={[Validator.required, Validator.email]}
            />
            <Field
              name="role"
              component={this.renderSelect}
              as={Form.Select}
              options={options}
              label="Role"
              placeholder="Select a role"
              validate={Validator.required}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Field
              name="password"
              component={this.renderInput}
              placeholder="********"
              label="Password"
              type="password"
              validate={[Validator.required, Validator.minLength7]}
            />
            <Field
              name="passwordConfirm"
              component={this.renderInput}
              placeholder="********"
              label="Confirm password"
              type="password"
              validate={[Validator.required, Validator.passwordsMatch]}
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const wrapped = reduxForm({ form: 'addUser' })(AddUserForm);

export default connect(null, { addUser })(wrapped);
