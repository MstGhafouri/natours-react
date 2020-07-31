import React, { useEffect } from 'react';
import { Form, Header } from 'semantic-ui-react';

import CustomBtn from '../../utils/CustomBtn';
import ContentBox from '../../utils/ContentBox';

const PasswordReset = () => {
  useEffect(() => {
    document.title = 'Natours | Forgot your password?';
  }, []);

  return (
    <div className="custom-form">
      <ContentBox headingText="Reset your password">
        <Form size="huge">
          <Header size="tiny" color="grey" style={{ wordSpacing: '0.2em' }}>
            Enter your user account's verified email address and we will send
            you a password reset link.
          </Header>
          <Form.Field>
            <label>Email address</label>
            <input placeholder="you@gmail.com" type="email" />
          </Form.Field>
          <CustomBtn classes="custom-btn" rgb="40, 180, 133" isLink={false}>
            Send password reset email
          </CustomBtn>
        </Form>
      </ContentBox>
    </div>
  );
};

export default PasswordReset;
