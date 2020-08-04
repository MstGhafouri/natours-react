import React, { useEffect } from 'react';
import { Form, Divider } from 'semantic-ui-react';

import CustomBtn from '../../utils/CustomBtn';
import ContentBox from '../../utils/ContentBox';

const Login = () => {
  useEffect(() => {
    document.title = 'Natours | Log In';
  }, []);

  return (
    <div className="custom-form custom-form-box">
      <ContentBox headingText="Log In to your account">
        <Form size="huge">
          <Form.Field>
            <label>Email address</label>
            <input placeholder="you@gmail.com" type="email" />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder="**********" type="password" />
          </Form.Field>
          <CustomBtn classes="custom-btn" rgb="40, 180, 133" isLink={false}>
            Login
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
};

export default Login;
