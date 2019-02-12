import * as actionTypes from '../action-types';

export default {
    userSet(data) {
        return { type: actionTypes.USER_SET, data };
    }
};
