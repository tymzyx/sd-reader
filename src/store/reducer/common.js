import * as actionTypes from '../action-types';

const initState = {
    actionIndex: 0
};

const common = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.COMMON_ACTIVE_TAB_SET:
            return { ...state, actionIndex: action.index };
        default:
            return state;
    }
};

export default common;
