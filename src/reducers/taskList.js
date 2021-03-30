import {
    FETCH_TASK,
    ADD_TASK,
    EDIT_TASK
} from '../actions/types';

export const reducer = (state = {tasks: [], total_task_count: 0}, action) => {

    switch (action.type) {
        case FETCH_TASK:
            return { ...state, tasks: action.payload.tasks, total_task_count: action.payload.total_task_count };
        case ADD_TASK:
            return { ...state, tasks: [ ...action.payload.tasks, action.payload] };
        case EDIT_TASK:
            return { ...state, tasks: state.tasks.map((item) => {
                    if (action.payload.id === item.id) {
                        return Object.assign(item, action.payload);
                    }
                    return item
                }) };
        default:
            return state;
    }
};
