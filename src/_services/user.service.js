import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    register,
    login,
    logout,
    getAll,
    blockUser,
    unblockUser,
    removeUser
};

function register(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };
    
    return fetch(`${config.apiUrl}/auth/register`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.apiUrl}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function blockUser(id) {
    const headers = authHeader();
    headers['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status: 'BLOCKED' })
    };

    return fetch(`${config.apiUrl}/users${id}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

function unblockUser(id) {
    const headers = authHeader();
    headers['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status: 'ACTIVE' })
    };

    return fetch(`${config.apiUrl}/users${id}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

function removeUser(id) {}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
