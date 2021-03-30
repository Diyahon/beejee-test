import axios from 'axios';
import History from '../history.js';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    EDIT_TASK,
    FETCH_TASK
} from './types';

const ROOT_URL = '/~shapoval/test-task-backend/v2';

export const signinUser = ({ username, password }) => {
    let form = new FormData();
    form.append('username', username);
    form.append('password', password);
    return async (dispatch) => {
        // submit username/password to the server
        try {
            const {data} = await axios.post(`${ROOT_URL}/login?developer=Nursultan`, form);
            if (data.status === 'ok') {
                // if request is good...
                // - update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });

                // - save the jwt token
                localStorage.setItem('token', data.message.token);

                // - redirect to the task list '/'
                History.push('/');
            } else {
                dispatch(authError(data.message[Object.keys(data.message)[0]]));
            }


        } catch (e) {
            dispatch(authError(e.data.message[0]));
        };
    };
};

export const createTask = ({ username, email, text }) => {
    let form = new FormData();
    form.append('username', username);
    form.append('email', email);
    form.append('text', text);
    return async (dispatch) => {
        // submit username/password to the server
        try {
            const {data} = await axios.post(`${ROOT_URL}/create?developer=Nursultan`, form);
            if (data.status === 'ok') {
                // if request is good...
                // - update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });

                // - save the jwt token
                localStorage.setItem('token', data.message.token);

                // - redirect to the task list '/'
                History.push('/');
            } else {
                dispatch(authError(data.message[Object.keys(data.message)[0]]));
            }
        } catch (e) {
            dispatch(authError(e.data.message[0]));
        };
    };
};

export const editTask = ({ id, text, status }) => {
    let form = new FormData();
    form.append('text', text);
    form.append('status', status);
    form.append('token', localStorage.getItem('token'));
    return async (dispatch) => {
        // submit username/password to the server
        try {
            const {data} = await axios.post(`${ROOT_URL}/edit/${id}/?developer=Nursultan`, form);
            if (data.status === 'ok') {
                // if request is good...
                // - update state to indicate user is authenticated
                dispatch({ type: EDIT_TASK, payload: { id, text, status: parseInt(status, 10) } });
            } else {
                dispatch(authError(data.message[Object.keys(data.message)[0]]));
            }
        } catch (e) {
            dispatch(authError(e.message[Object.keys(e.message)[0]]));
        };
    };
};


export const authError = (error) => {
    return {
        type: AUTH_ERROR,
        payload: error
    };
};

export const signoutUser = () => {
    localStorage.removeItem('token')
    return { type: UNAUTH_USER };
};

export const fetchTaskList = (page = 1, sort_field = 'id', sort_direction = false) => {
    sort_direction = sort_direction ? 'asc' : 'desc';
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`${ROOT_URL}/?developer=Nursultan&page=${page}&sort_field=${sort_field}&sort_direction=${sort_direction}`);
            dispatch({
                type: FETCH_TASK,
                payload: data.message
            });
        } catch (e) {

        }

    };
};
