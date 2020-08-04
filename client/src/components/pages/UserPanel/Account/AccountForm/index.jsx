import React from 'react';
import { Form } from 'semantic-ui-react';

import CustomBtn from '../../../../utils/CustomBtn';
import ContentBox from '../../../../utils/ContentBox';

const AccountForm = () => {
  return (
    <div className="custom-form settings-form">
      <ContentBox headingText="Your account settings">
        <Form size="huge">
          <Form.Field>
            <label>Full name</label>
            <input placeholder="Your fullName" type="text" />
          </Form.Field>
          <Form.Field>
            <label>Email address</label>
            <input placeholder="you@gmail.com" type="email" />
          </Form.Field>
          <CustomBtn classes="custom-btn" rgb="40, 180, 133" isLink={false}>
            Save settings
          </CustomBtn>
        </Form>
      </ContentBox>
    </div>
  );
};

export default AccountForm;
