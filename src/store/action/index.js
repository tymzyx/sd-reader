import actionTypes from '../action-type';

export default {
    testChange(val) {
        return { type: actionTypes.TEST_CHANGE, val };
    }
};
