import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';

import CustomBtn from '../../../../utils/CustomBtn';
import ContentBox from '../../../../utils/ContentBox';

const AccountForm = ({ currentUser }) => {
  return (
    <div className="custom-form settings-form">
      <ContentBox headingText="Your account settings">
        <Form size="huge">
          <Form.Field>
            <label>Full name</label>
            <input
              placeholder="Your fullName"
              type="text"
              defaultValue={currentUser ? currentUser.name : ''}
            />
          </Form.Field>
          <Form.Field>
            <label>Email address</label>
            <input
              placeholder="you@gmail.com"
              type="email"
              defaultValue={currentUser ? currentUser.email : ''}
            />
          </Form.Field>
          <CustomBtn classes="custom-btn" rgb="40, 180, 133" isLink={false}>
            Save settings
          </CustomBtn>
        </Form>
      </ContentBox>
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser } }) => ({ currentUser });

export default connect(mapStateToProps)(AccountForm);
