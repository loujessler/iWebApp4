import React from 'react';
import {Navigate} from 'react-router-dom';

import AuthForm from './AuthForm';
import BaseAuth from './BaseAuth';


class Register extends BaseAuth {
    render() {
        const { error, isAuthenticated } = this.state;

        if (isAuthenticated) {
            return <Navigate to="/user_list" />;
        }

        return (
            <AuthForm
                title="Sing up"
                handleSubmit={(e) => this.handleAuth(e, '/api/register/', 'Registration failed')}
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
                        id: 'email',
                        label: 'email',
                        type: 'email',
                        placeholder: 'Enter your email',
                        value: this.state.email,
                        onChange: (e) => this.handleInputChange(e, 'email')
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
                buttonText="Sign Up"
                error={error}
                footerText="Back to login"
                path_to="/login"
            />
        );
    }

}

export default Register;
