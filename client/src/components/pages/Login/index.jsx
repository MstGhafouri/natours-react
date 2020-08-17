import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import { Form, Divider, Label, Loader } from 'semantic-ui-react';

import { login } from '../../../redux/actions/user';
import { loadingSelector as createLoadingSelector } from '../../../redux/reducers/loading';
import CustomBtn from '../../utils/CustomBtn';
import ContentBox from '../../utils/ContentBox';
import Validator from '../../../validator';

class Login extends React.Component {
  componentDidMount() {
    document.title = 'Natours | Log In';
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
    this.props.login(formValues);
    dispatch(reset('login'));
  };

  render() {
    const { isLoading } = this.props;

    return (
      <div className="custom-form custom-form-box">
        <ContentBox headingText="Log In to your account">
          <Form size="huge" onSubmit={this.props.handleSubmit(this.onSubmit)}>
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
            <CustomBtn classes="custom-btn" rgb="40, 180, 133" isLink={false}>
              <Loader
                inline
                inverted
                className={`${isLoading ? 'active' : ''}`}
                style={{ marginRight: '3px' }}
              />
              {isLoading ? 'Processing' : 'Login'}
            </CustomBtn>
            <Divider section />
            <CustomBtn
              linkTo="/password-reset"
              classes="font-w-normal font-s-small"
            >
              Forgot your password?
            </CustomBtn>
          </Form>
        </ContentBox>
      </div>
    );
  }
}

const loadingSelector = createLoadingSelector(['LOG_IN_USER']);

const mapStateToProps = state => ({ isLoading: loadingSelector(state) });

const wrapped = reduxForm({ form: 'login' })(Login);

export default connect(mapStateToProps, { login })(wrapped);
