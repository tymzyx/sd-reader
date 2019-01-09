import React, { Component } from 'react';
import Proptypes from 'prop-types';
import SvgIcon from '../SvgIcon/index';

import './HeadBar.scss';

class HeadBar extends Component {
    render() {
        const { title } = this.props;

        return (
            <div className="head-bar-wrapper">
                <div className="head-left">
                    {title}
                </div>
                <div className="head-right">
                    <span>更多</span>
                    <SvgIcon iconClass="arrow" propClass="icon-arrow-right" />
                </div>
            </div>
        );
    }
}

HeadBar.propTypes = {
    title: Proptypes.string
};

export default HeadBar;
