import actionTypes from '../action-type';

const initState = {
    testVal: true
};

function test(state = initState, action) {
    switch (action.type) {
    case actionTypes.TEST_CHANGE:
        return { ...state, testVal: action.val };
    default:
        return state;
    }
}

export default test;
