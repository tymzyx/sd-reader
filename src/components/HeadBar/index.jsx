import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '../SvgIcon/index';
import { judgeType } from '../../utils/index';

import './HeadBar.scss';

class HeadBar extends Component {
    render() {
        const { type, title, extra, isIcon } = this.props;

        return (
            <div className="head-bar-wrapper">
                <div className={`head-left ${type}-size`}>
                    {title}
                </div>
                {judgeType(extra) === 'string' ? (
                    <div className="head-right">
                        {extra && <span>{extra}</span>}
                        {isIcon && <SvgIcon iconClass="arrow" propClass="icon-arrow-right" />}
                    </div>
                ) : extra}
            </div>
        );
    }
}

HeadBar.defaultProps = {
    type: 'middle',
    extra: '',
    isIcon: false
};

HeadBar.propTypes = {
    type: PropTypes.string, // 可选值huge, large, middle, small
    title: PropTypes.string,
    extra: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    isIcon: PropTypes.bool
};

export default HeadBar;
