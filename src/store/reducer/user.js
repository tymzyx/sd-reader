import * as actionTypes from '../action-types';

const initState = {
    username: '',
    userId: ''
};

const user = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.USER_SET:
            return { ...state, ...action.data };
        default:
            return state;
    }
};

export default user;
