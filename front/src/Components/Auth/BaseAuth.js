import { Component } from 'react';
import { getCookie } from '../../Utils/cookieUtils';


class BaseAuth extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        error: null,
        isAuthenticated: false,
    };

    handleAuth = (event, endpoint, errorMsg) => {
        event.preventDefault();

        const { username, email, password } = this.state;

        const csrfToken = getCookie('csrftoken');
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({ username, password, email }),
        };

        fetch(endpoint, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(errorMsg);
                }
                return response.json();
            })
            .then((data) => {
                this.setState({ isAuthenticated: true });
                localStorage.setItem('currentUserId', data.user_id);
            })
            .catch((error) => {
                this.setState({ error: error.message });
            });
    }

    handleInputChange = (e, field) => {
        this.setState({ [field]: e.target.value });
    }
}

export default BaseAuth;