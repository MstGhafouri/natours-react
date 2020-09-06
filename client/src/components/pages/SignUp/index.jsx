import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Form, Label } from 'semantic-ui-react';
import queryString from 'query-string';

import { signup, confirmUserEmail } from '../../../redux/actions/user';
import { loadingSelector as createLoadingSelector } from '../../../redux/reducers/loading';
import CustomBtn from '../../utils/CustomBtn';
import ContentBox from '../../utils/ContentBox';
import ButtonLoader from '../../utils/ButtonLoader';
import Spinner from '../../utils/Spinner';
import Validator from '../../../validator';

class SignUp extends React.Component {
  componentDidMount() {
    document.title = 'Natours | Sign up';
    const { location, confirmUserEmail } = this.props;
    const { token } = queryString.parse(location.search);
    if (token) {
      confirmUserEmail(token);
    }
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
    this.props.signup(formValues);
    dispatch(reset('signup'));
  };

  render() {
    const {
      isLoading,
      location: { search }
    } = this.props;
    const { token } = queryString.parse(search);

    return isLoading && token ? (
      <Spinner />
    ) : (
      <div className="custom-form custom-form-box">
        <ContentBox headingText="Join into natours family">
          <Form size="huge" onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field
              name="name"
              component={this.renderInput}
              placeholder="Your fullName"
              label="Full name"
              type="text"
              validate={[Validator.required, Validator.twoPartValue]}
            />
            <Field
              name="email"
              component={this.renderInput}
              placeholder="you@mail.com"
              label="Email address"
              type="email"
              validate={[Validator.required, Validator.email]}
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
              <ButtonLoader
                isLoading={isLoading}
                text="Sign Up"
                loadingText="Processing"
              />
            </CustomBtn>
          </Form>
        </ContentBox>
      </div>
    );
  }
}

const loadingSelector = createLoadingSelector([
  'SIGN_UP_USER',
  'CONFIRM_EMAIL'
]);

const mapStateToProps = state => ({ isLoading: loadingSelector(state) });

const wrapped = reduxForm({ form: 'signup' })(withRouter(SignUp));

export default connect(mapStateToProps, { signup, confirmUserEmail })(wrapped);
