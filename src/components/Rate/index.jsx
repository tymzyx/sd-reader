import React, { Component } from 'react';
import Proptypes from 'prop-types';
import SvgIcon from '../SvgIcon';

import './Rate.scss';

class Rate extends Component {
    render() {
        let { rate } = this.props;
        rate = rate || 0;
        const num0 = Math.floor(rate);
        const num1 = Math.floor(5 - rate);
        const num2 = (rate - num0) ? 1 : 0;

        return (
            <div className="rate-wrapper">
                {(new Array(num0)).fill(1).map((item, index) => (
                    <SvgIcon key={index + item} iconClass="rate" propClass="icon-rate" />
                ))}
                {num2 ? <SvgIcon iconClass="rate-half" propClass="icon-rate" /> : ''}
                {(new Array(num1)).fill(10).map((item, index) => (
                    <SvgIcon key={index + item} iconClass="rate-no" propClass="icon-rate" />
                ))}
            </div>
        );
    }
}

Rate.propTypes = {
    rate: Proptypes.number
};

export default Rate;
