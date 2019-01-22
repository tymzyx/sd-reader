import React, { Component } from 'react';
import Proptypes from 'prop-types';
import SvgIcon from '../SvgIcon';

import './Rate.scss';

class Rate extends Component {
    render() {
        const { rate } = this.props;
        const num0 = Math.floor(rate);
        const num1 = Math.floor(5 - rate);
        const num2 = (rate - num0) ? 1 : 0;

        return (
            <div className="rank-wrapper">
                {(new Array(num0)).fill(1).map((item, index) => (
                    <SvgIcon key={index + item} iconClass="rank" propClass="icon-rank" />
                ))}
                {num2 && <SvgIcon iconClass="rank-half" propClass="icon-rank" />}
                {(new Array(num1)).fill(10).map((item, index) => (
                    <SvgIcon key={index + item} iconClass="rank-no" propClass="icon-rank" />
                ))}
            </div>
        );
    }
}

Rate.propTypes = {
    rate: Proptypes.number
};

export default Rate;
