import { combineReducers } from 'redux';
import { reducer as authReducer } from './auth';
import { reducer as taskListReducer } from './taskList';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    routing: routerReducer,
    form: formReducer,
    auth: authReducer,
    taskList: taskListReducer
});

export default rootReducer;
