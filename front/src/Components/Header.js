import React from 'react';
import {Button, Navbar, NavbarBrand, Nav, NavItem} from 'reactstrap';

import { Navigate } from 'react-router-dom';

class Header extends React.Component {
    state = {
        redirectToLogin: false,
    };

    handleLogout = () => {
        // Удаляем данные текущего пользователя из localStorage.
        localStorage.removeItem('currentUserId');

        // Переводим состояние так, чтобы сработало перенаправление.
        this.setState({ redirectToLogin: true });
    };

    render() {
        if (this.state.redirectToLogin) {
            return <Navigate to="/login" />;
        }

        const userId = localStorage.getItem('currentUserId');
        const { users } = this.props;
        const currentUser = users.find(user => user.id === parseInt(userId));
        console.log(document.cookie)

        return (
            <Navbar color="dark" light dark full expand="md" container="fluid">
                <NavbarBrand>Welcome, {currentUser ? currentUser.username : "Guest"}</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button color="danger" onClick={this.handleLogout}>Logout</Button>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default Header;
