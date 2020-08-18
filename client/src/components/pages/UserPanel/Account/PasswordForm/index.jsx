import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import { Form, Label, Loader } from 'semantic-ui-react';

import { loadingSelector as createLoadingSelector } from '../../../../../redux/reducers/loading';
import { updateUserPassword } from '../../../../../redux/actions/user';
import CustomBtn from '../../../../utils/CustomBtn';
import ContentBox from '../../../../utils/ContentBox';
import Validator from '../../../../../validator';

class PasswordForm extends React.Component {
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

  onSubmit = (formValues, dispatch) => {
    this.props.updateUserPassword(formValues);
    dispatch(reset('signup'));
  };

  render() {
    const { isLoading } = this.props;

    return (
      <div className="custom-form settings-form">
        <ContentBox headingText="Password change">
          <Form size="huge" onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field
              name="currentPassword"
              component={this.renderInput}
              placeholder="********"
              label="Current password"
              type="password"
              validate={[Validator.required, Validator.minLength7]}
            />
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
            <CustomBtn classes="custom-btn" rgb="40, 180, 133" isLink={false}>
              <Loader
                inline
                inverted
                className={`${isLoading ? 'active' : ''}`}
                style={{ marginRight: '3px' }}
              />
              {isLoading ? 'Updating' : 'Save password'}
            </CustomBtn>
          </Form>
        </ContentBox>
      </div>
    );
  }
}

const loadingSelector = createLoadingSelector(['UPDATE_USER_PASSWORD']);

const mapStateToProps = state => ({
  isLoading: loadingSelector(state),
  currentUser: state.user.currentUser
});

const wrapped = reduxForm({ form: 'updatePassword' })(PasswordForm);

export default connect(mapStateToProps, { updateUserPassword })(wrapped);
