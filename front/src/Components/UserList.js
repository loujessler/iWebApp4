import React, {Component} from 'react';
import {Navigate} from "react-router-dom";
import {Button, Table, Input, Container} from 'reactstrap';

import Header from './Header';
import {getCookie} from "../Utils/cookieUtils";
import {formatDate} from "../Utils/formatDate"


class UserList extends Component {
    state = {
        users: [],
        selectedUsers: [],
        redirect: false,
    };

    handleSelectUser = (userId) => {
        this.setState(prevState => ({
            selectedUsers: prevState.selectedUsers.includes(userId) ?
                prevState.selectedUsers.filter(id => id !== userId) :
                [...prevState.selectedUsers, userId]
        }));
    }

    handleSelectAllUsers = () => {
        this.setState(prevState => ({
            selectedUsers: prevState.selectedUsers.length === prevState.users.length ?
                [] :
                prevState.users.map(user => user.id)
        }));
    }

    fetchUsersList = () => {
        fetch('/api/users')
            .then(response => response.json())
            .then(data => {
                const updatedUsers = data.map(user => ({
                    ...user,
                    isBlocked: !user.is_active,
                }));
                this.setState({selectedUsers: [], users: updatedUsers});

                const currentUserId = parseInt(localStorage.getItem('currentUserId'), 10);
                const loggedInUser = updatedUsers.find(user => user.id === currentUserId);
                if (loggedInUser && !loggedInUser.is_active) {
                    this.setState({redirect: true});
                }
            })
            .catch(error => console.error(error));
    }

    handleAction = (action) => {
        const {selectedUsers} = this.state;
        const csrfToken = getCookie('csrftoken');
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({user_ids: selectedUsers, action: action}),
        };

        fetch(`/api/${action.toLowerCase()}/users/`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return this.fetchUsersList();
                } else {
                    throw new Error(`${action} action failed`);
                }
            })
            .then(() => {
                const currentUserId = parseInt(localStorage.getItem('currentUserId'));
                const loggedInUser = this.state.users.find(user => user.id === currentUserId);
                console.log('loggedInUser: ', loggedInUser)
                if ((selectedUsers.includes(currentUserId) && !loggedInUser.is_active) || (loggedInUser && !loggedInUser.is_active)) {
                    this.setState({redirect: true});
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        this.fetchUsersList();
    }

    render() {
        const {redirect, selectedUsers, users} = this.state;

        if (redirect) {
            return <Navigate to="/login"/>;
        }

        return (
            <div>
                <Header users={users}/>
                <Container className="mt-3">
                    <div className="d-flex justify-content-end mb-3 pe-2">
                        <Button color="primary" onClick={() => this.handleAction('Block')}
                                style={{marginRight: '10px'}}>Block</Button>
                        <Button color="success" onClick={() => this.handleAction('Unblock')}
                                style={{marginRight: '10px'}}>Unblock</Button>
                        <Button color="danger" onClick={() => this.handleAction('Delete')}>Delete</Button>
                    </div>
                    <Table size="sm" bordered hover striped className="overflow-visible">
                        <thead>
                        <tr>
                            <th>
                                <Input
                                    type="checkbox"
                                    onChange={this.handleSelectAllUsers}
                                    checked={selectedUsers.length === users.length}
                                />
                            </th>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Date Joined</th>
                            <th>Last Login</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <Input
                                        type="checkbox"
                                        onChange={() => this.handleSelectUser(user.id)}
                                        checked={selectedUsers.includes(user.id)}
                                    />
                                </td>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{formatDate(user.date_joined)}</td>
                                <td>{formatDate(user.last_login)}</td>
                                <td>{user.is_active ? <span className="text-success">Active</span> :
                                    <span className="text-danger">Blocked</span>}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default UserList;
