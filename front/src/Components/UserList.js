import React, { Component } from 'react';
import {Navigate} from "react-router-dom";
import {Button, Table, Input, Container} from 'reactstrap';

import {getCookie} from "../Utils/cookieUtils";
import Header from './Header';


class UserList extends Component {
    state = {
        users: [],
        selectedUsers: [],
        redirect: false,
    };

    handleSelectUser = (userId) => {
        const { selectedUsers } = this.state;
        if (selectedUsers.includes(userId)) {
            this.setState({
                selectedUsers: selectedUsers.filter(id => id !== userId),
            });
        } else {
            this.setState({
                selectedUsers: [...selectedUsers, userId],
            });
        }
    }

    handleAction = (action) => {
        const { selectedUsers } = this.state;
        const csrfToken = getCookie('csrftoken');
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({ user_ids: selectedUsers, action: action }),
        };

        fetch(`/api/${action.toLowerCase()}/users/`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return this.fetchUsersList(); // Update the user list after the action
                } else {
                    throw new Error(`${action} action failed`);
                }
            })
            .then(() => {
                const currentUserId = parseInt(localStorage.getItem('currentUserId'));
                const loggedInUser = this.state.users.find(user => user.id === currentUserId);
                if (loggedInUser && !loggedInUser.is_active) {
                    this.setState({ redirect: true });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    fetchUsersList = () => {
        fetch('/api/users')
            .then(response => response.json())
            .then(data => {
                const updatedUsers = data.map(user => ({
                    ...user,
                    isBlocked: !user.is_active,
                }));
                this.setState({ selectedUsers: [], users: updatedUsers });

                const currentUserId = parseInt(localStorage.getItem('currentUserId'), 10);
                const loggedInUser = updatedUsers.find(user => user.id === currentUserId);
                if (loggedInUser && !loggedInUser.is_active) {
                    this.setState({ redirect: true });
                }
            })
            .catch(error => console.error(error));
    }


    componentDidMount() {
        this.fetchUsersList();
    }

    formatDate(dateString) {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Добавляем 1, так как месяцы в JS начинаются с 0
        const day = String(date.getDate()).padStart(2, '0');

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/login" />;
        }
        const { selectedUsers, users } = this.state;

        return (
            <div>
                <Header users={this.state.users} />
                <Container className="mt-4">
                    <div className="d-flex justify-content-end mb-3">
                        <Button color="primary" onClick={() => this.handleAction('Block')} style={{ marginRight: '10px' }}>Block</Button>
                        <Button color="success" onClick={() => this.handleAction('Unblock')} style={{ marginRight: '10px' }}>Unblock</Button>
                        <Button color="danger" onClick={() => this.handleAction('Delete')}>Delete</Button>
                    </div>

                    <Table size="sm" bordered hover striped className="overflow-visible">
                        <thead>
                        <tr>
                            <th>
                                <Input
                                    type="checkbox"
                                    onChange={() => {
                                        if (selectedUsers.length === users.length) {
                                            this.setState({ selectedUsers: [] });
                                        } else {
                                            this.setState({ selectedUsers: users.map(user => user.id) });
                                        }
                                    }}
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
                                <td>{this.formatDate(user.date_joined)}</td>
                                <td>{this.formatDate(user.last_login)}</td>
                                <td>{user.is_active ? <span className="text-success">Active</span> : <span className="text-danger">Blocked</span>}</td>
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
