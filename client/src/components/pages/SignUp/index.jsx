import React, { useEffect } from 'react';
import { Form } from 'semantic-ui-react';

import CustomBtn from '../../utils/CustomBtn';
import ContentBox from '../../utils/ContentBox';

const SignUp = () => {
  useEffect(() => {
    document.title = 'Natours | Sign up';
  }, []);

  return (
    <div className="custom-form">
      <ContentBox headingText="Join into natours family">
        <Form size="huge">
          <Form.Field>
            <label>Full name</label>
            <input placeholder="Your fullName" type="text" />
          </Form.Field>
          <Form.Field>
            <label>Email address</label>
            <input placeholder="you@gmail.com" type="email" />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder="**********" type="password" />
          </Form.Field>
          <Form.Field>
            <label>Confirm password</label>
            <input placeholder="**********" type="password" />
          </Form.Field>
          <CustomBtn classes="custom-btn" rgb="40, 180, 133" isLink={false}>
            Sign Up
          </CustomBtn>
        </Form>
      </ContentBox>
    </div>
  );
};

export default SignUp;
