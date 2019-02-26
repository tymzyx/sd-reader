import * as actionTypes from '../action-types';

export default {
    activeTabSet(index) {
        return { type: actionTypes.COMMON_ACTIVE_TAB_SET, index };
    }
};
