import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import {
  Table,
  Pagination,
  Header,
  Loader,
  Button
} from 'semantic-ui-react';
import _ from 'lodash';

import { loadingSelector as createLoadingSelector } from '../../../../../redux/reducers/loading';
import Modal from '../../../../utils/Modal';
import natoursApi from '../../../../../api/natoursApi';
import UserLayout from '../../../../HOC/User';
import UserTableRow from './TableRow';
import AddUserForm from './AddUserForm';

const ManageUsersTable = ({ isLoading }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [state, dispatch] = React.useReducer(userReducer, {
    column: null,
    data: [],
    direction: null
  });

  const renderActions = () => (
    <React.Fragment>
      <Button color="grey" size="big" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button
        form="addUserForm"
        type="submit"
        content="Save"
        size="big"
        labelPosition="right"
        icon={isLoading ? 'spinner loading' : 'checkmark'}
        positive
      />
    </React.Fragment>
  );

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const response = await natoursApi.get('/users?limit=300');
        dispatch({ type: 'USERS_READY', payload: response.data.data.users });
        setLoading(false);
      } catch (error) {
        toastr.error('Error', error.response.data.message);
      }
    };

    getUsers();
  }, []);

  const { column, data, direction } = state;

  return (
    <UserLayout>
      <div className="table-container">
        <Header size="large">Manage users</Header>
        <Table singleLine selectable striped sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'name' ? direction : null}
                onClick={() =>
                  dispatch({ type: 'CHANGE_SORT', column: 'name' })
                }
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'date' ? direction : null}
                onClick={() =>
                  dispatch({ type: 'CHANGE_SORT', column: 'date' })
                }
              >
                Registration Date
              </Table.HeaderCell>
              <Table.HeaderCell>E-mail address</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Photo</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Edit</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map(user => (
              <UserTableRow {...user} key={user._id} />
            ))}
            {loading && (
              <Table.Row>
                <Table.Cell colSpan="7">
                  <Loader active indeterminate inline="centered">
                    Preparing Files
                  </Loader>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell>
                <Pagination
                  defaultActivePage={1}
                  firstItem={null}
                  lastItem={null}
                  pointing
                  totalPages={1}
                />
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="6">
                <Modal
                  TriggerComponent={
                    <Button
                      icon="user plus"
                      content="Add User"
                      size="big"
                      floated="right"
                      color="green"
                    />
                  }
                  headerIcon="user plus"
                  headerText="Add New User"
                  cta={renderActions()}
                  open={open}
                  setOpen={setOpen}
                >
                  <AddUserForm />
                </Modal>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    </UserLayout>
  );
};

function userReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending'
        };
      }
      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: 'ascending'
      };
    case 'USERS_READY':
      return { ...state, data: action.payload };
    default:
      throw new Error();
  }
}

const loadingSelector = createLoadingSelector(['ADD_USER']);

const mapStateToProps = state => ({ isLoading: loadingSelector(state) });

export default connect(mapStateToProps)(ManageUsersTable);
