import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Gap.scss';

class Gap extends Component {
    render() {
        const { style } = this.props;

        return (
            <div className="base-gap" style={style} />
        );
    }
}

Gap.propTypes = {
    style: PropTypes.object
};

export default Gap;
