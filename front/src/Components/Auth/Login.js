import React from 'react';
import {Navigate} from 'react-router-dom';

import AuthForm from './AuthForm';
import BaseAuth from './BaseAuth';


class Login extends BaseAuth {
    render() {
        const { error, isAuthenticated } = this.state;

        if (isAuthenticated) {
            return <Navigate to="/user_list" />;
        }

        return (
            <AuthForm
                title="Sing in"
                handleSubmit={(e) => this.handleAuth(e, '/api/login/', 'Authentication failed')}
                fields={[
                    {
                        id: 'username',
                        label: 'Username',
                        type: 'text',
                        placeholder: 'Username',
                        value: this.state.username,
                        onChange: (e) => this.handleInputChange(e, 'username')
                    },
                    {
                        id: 'password',
                        label: 'Password',
                        type: 'password',
                        placeholder: 'Password',
                        value: this.state.password,
                        onChange: (e) => this.handleInputChange(e, 'password')
                    }
                ]}
                buttonColor="primary"
                buttonText="Login"
                error={error}
                footerText="Sign up"
                path_to="/register"
            />
        );
    }
}

export default Login;
