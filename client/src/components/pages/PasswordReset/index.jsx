import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import { Form, Header, Label, Loader } from 'semantic-ui-react';

import { resetUserPassword } from '../../../redux/actions/user';
import { loadingSelector as createLoadingSelector } from '../../../redux/reducers/loading';
import CustomBtn from '../../utils/CustomBtn';
import ContentBox from '../../utils/ContentBox';
import Validator from '../../../validator';

class PasswordReset extends React.Component {
  componentDidMount() {
    document.title = 'Natours | Forgot your password?';
  }

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
    this.props.resetUserPassword(formValues);
    dispatch(reset('passwordReset'));
  };

  render() {
    const { isLoading } = this.props;

    return (
      <div className="custom-form custom-form-box">
        <ContentBox headingText="Reset your password">
          <Form size="huge" onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Header size="tiny" color="grey" style={{ wordSpacing: '0.2em' }}>
              Enter your user account's verified email address and we will send
              you a password reset link.
            </Header>
            <Field
              name="email"
              component={this.renderInput}
              placeholder="you@mail.com"
              label="Email address"
              type="email"
              validate={[Validator.required, Validator.email]}
            />
            <CustomBtn classes="custom-btn" rgb="40, 180, 133" isLink={false}>
              <Loader
                inline
                inverted
                className={`${isLoading ? 'active' : ''}`}
                style={{ marginRight: '3px' }}
              />
              {isLoading ? 'Sending' : 'Send password reset email'}
            </CustomBtn>
          </Form>
        </ContentBox>
      </div>
    );
  }
}

const loadingSelector = createLoadingSelector(['RESET_PASSWORD']);

const mapStateToProps = state => ({ isLoading: loadingSelector(state) });

const wrapped = reduxForm({ form: 'passwordReset' })(PasswordReset);

export default connect(mapStateToProps, { resetUserPassword })(wrapped);
