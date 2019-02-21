import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Tag.scss';

class Tag extends Component {
    render() {
        const { style, click } = this.props;

        return (
            <div
                className="tag-wrapper"
                style={{ ...style }}
                onClick={(e) => { click && click(e); }}
            >
                {this.props.children}
            </div>
        );
    }
}

Tag.propTypes = {
    style: PropTypes.object,
    children: PropTypes.any,
    click: PropTypes.func
};

export default Tag;
