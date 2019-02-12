import * as actionTypes from '../action-types';

const initState = {
    testVal: true
};

const test = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.TEST_CHANGE:
            return { ...state, testVal: action.val };
        default:
            return state;
    }
};

export default test;
