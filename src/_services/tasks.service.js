import axios from 'axios';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
};

const headers = {
    'Content-Type': 'application/json' 
};

function register(user) {
    return axios
    .post(import.meta.env.VITE_API_URL + 'auth/register', user ,headers)
    .then(response => {
      return response.data;
    });
}

function login(email, password) {
    const headers = {
        'Content-Type': 'application/json' 
    };

    return axios
      .post(import.meta.env.VITE_API_URL + 'auth/login', {
        email: email,
        password: password
      },headers)
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
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

    return axios
      .get(import.meta.env.VITE_API_URL + 'users',{
        headers : authHeader()
    })
      .then(response => {
        return response.data;
      });
}