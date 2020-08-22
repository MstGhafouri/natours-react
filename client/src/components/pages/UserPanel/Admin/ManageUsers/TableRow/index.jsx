import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Image, Header, Icon } from 'semantic-ui-react';

import { deleteUser } from '../../../../../../redux/actions/user';
import { loadingSelector as createLoadingSelector } from '../../../../../../redux/reducers/loading';
import Modal from '../../../../../utils/Modal';

const UserTableRow = ({
  name,
  email,
  photo,
  role,
  createdAt,
  _id,
  deleteUser,
  isLoading
}) => {
  const [openDelete, setOpenDelete] = React.useState(false);

  const onDeleteBtnClick = async () => {
    await deleteUser(_id);
    setOpenDelete(false);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const renderDeleteActions = () => (
    <React.Fragment>
      <Button
        color="red"
        inverted
        size="big"
        onClick={() => setOpenDelete(false)}
      >
        <Icon name="remove" /> No
      </Button>
      <Button color="green" inverted size="big" onClick={onDeleteBtnClick}>
        {isLoading ? (
          <Icon name="circle notch" loading />
        ) : (
          <Icon name="checkmark" />
        )}{' '}
        Yes
      </Button>
    </React.Fragment>
  );

  return (
    <Table.Row>
      <Table.Cell>
        <Header as="h3">{name}</Header>
      </Table.Cell>
      <Table.Cell>
        {new Date(createdAt).toLocaleString('en-us', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </Table.Cell>
      <Table.Cell>{email}</Table.Cell>
      <Table.Cell>{role}</Table.Cell>
      <Table.Cell>
        <Image
          src={`${process.env.PUBLIC_URL}/img/users/${photo}`}
          alt={name}
          size="mini"
          centered
          circular
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Button icon="edit" basic color="teal" />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Modal
          TriggerComponent={<Button icon="user delete" basic color="orange" />}
          headerIcon="delete user"
          cta={renderDeleteActions()}
          open={openDelete}
          setOpen={setOpenDelete}
        >
          <Header style={{ fontSize: '1.4rem' }}>
            Are you sure you want to delete user
            <mark style={{ margin: '0 0.5rem' }}>{name}</mark>?
          </Header>
        </Modal>
      </Table.Cell>
    </Table.Row>
  );
};

const loadingSelector = createLoadingSelector(['DELETE_USER']);

const mapStateToProps = state => ({ isLoading: loadingSelector(state) });

export default connect(mapStateToProps, { deleteUser })(UserTableRow);
