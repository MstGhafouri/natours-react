import React from 'react';
import { Form } from 'semantic-ui-react';

import CustomBtn from '../../../../utils/CustomBtn';
import ContentBox from '../../../../utils/ContentBox';

const PasswordForm = () => {
  return (
    <div className="custom-form settings-form">
      <ContentBox headingText="Password change">
        <Form size="huge">
          <Form.Field>
            <label>Current password</label>
            <input placeholder="**********" type="password" />
          </Form.Field>
          <Form.Field>
            <label>New password</label>
            <input placeholder="**********" type="password" />
          </Form.Field>
          <Form.Field>
            <label>Confirm password</label>
            <input placeholder="**********" type="password" />
          </Form.Field>
          <CustomBtn classes="custom-btn" rgb="40, 180, 133" isLink={false}>
            Save password
          </CustomBtn>
        </Form>
      </ContentBox>
    </div>
  );
};

export default PasswordForm;
