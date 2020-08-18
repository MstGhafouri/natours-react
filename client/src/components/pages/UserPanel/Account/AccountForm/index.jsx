import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Form, Label, Loader } from 'semantic-ui-react';

import { loadingSelector as createLoadingSelector } from '../../../../../redux/reducers/loading';
import { updateUserData } from '../../../../../redux/actions/user';
import CustomBtn from '../../../../utils/CustomBtn';
import ContentBox from '../../../../utils/ContentBox';
import Validator from '../../../../../validator';

class AccountForm extends React.Component {
  componentWillMount() {
    const { initialize, currentUser } = this.props;
    initialize({ name: currentUser.name, email: currentUser.email });
  }

  //if your data can be updated
  componentWillReceiveProps(nextProps) {
    const { initialize, destroy, currentUser } = this.props;

    if (
      nextProps.currentUser.name !== currentUser.name ||
      nextProps.currentUser.email !== currentUser.email
    ) {
      destroy();
      initialize({
        name: nextProps.currentUser.name,
        email: nextProps.currentUser.email
      });
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

  onSubmit = formValues => {
    this.props.updateUserData(formValues);
  };

  render() {
    const { isLoading } = this.props;

    return (
      <div className="custom-form settings-form">
        <ContentBox headingText="Your account settings">
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
            <CustomBtn classes="custom-btn" rgb="40, 180, 133" isLink={false}>
              <Loader
                inline
                inverted
                className={`${isLoading ? 'active' : ''}`}
                style={{ marginRight: '3px' }}
              />
              {isLoading ? 'Updating' : 'Save settings'}
            </CustomBtn>
          </Form>
        </ContentBox>
      </div>
    );
  }
}

const loadingSelector = createLoadingSelector(['UPDATE_USER_DATA']);

const mapStateToProps = state => ({
  isLoading: loadingSelector(state),
  currentUser: state.user.currentUser
});

const wrapped = reduxForm({ form: 'updateData' })(AccountForm);

export default connect(mapStateToProps, { updateUserData })(wrapped);
