import React, { useEffect } from 'react';
import { Form, Container, Header } from 'semantic-ui-react';

import CustomBtn from '../../utils/CustomBtn';

const Login = () => {
  useEffect(() => {
    document.title = 'Natours | Log In';
  }, []);

  return (
    <div className="login-form">
      <Container>
        <Header size="large">Log In to your account</Header>
        <Form size="huge">
          <Form.Field>
            <label>Email address</label>
            <input placeholder="you@gmail.com" type="email" />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder="**********" type="password" />
          </Form.Field>
          {/* <Button type="submit">Submit</Button> */}
          <CustomBtn
            classes="custom-btn"
            rgb="40, 180, 133"
            isLink={false}
          >
            Login
          </CustomBtn>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
