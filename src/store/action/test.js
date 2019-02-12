import * as actionTypes from '../action-types';

export default {
    testChange(val) {
        return { type: actionTypes.TEST_CHANGE, val };
    }
};
