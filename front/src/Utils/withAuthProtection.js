import React from 'react';
import { Navigate } from 'react-router-dom';

function withAuthProtection(WrappedComponent) {
    return class extends React.Component {
        render() {
            const isAuthenticated = localStorage.getItem('currentUserId');

            if (!isAuthenticated) {
                return <Navigate to="/login" />;
            }

            return <WrappedComponent {...this.props} />;
        }
    };
}

export default withAuthProtection;
