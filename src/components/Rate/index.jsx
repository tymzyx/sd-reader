import React, { Component } from 'react';
import Proptypes from 'prop-types';
import SvgIcon from '../SvgIcon';

import './Rate.scss';

class Rate extends Component {
    changeRate = (rate) => {
        if (rate === this.props.rate) return;
        this.props.rating(rate);
    };

    render() {
        const { isRating, style } = this.props;
        let { rate } = this.props;
        rate = rate || 0;
        const num0 = Math.floor(rate);
        const num1 = Math.floor(5 - rate);
        const num2 = (rate - num0) ? 1 : 0;

        return (
            <div className="rate-wrapper" style={{ ...style }}>
                {(new Array(num0)).fill(1).map((item, index) => (
                    <SvgIcon
                        key={index + item}
                        iconClass="rate"
                        propClass="icon-rate"
                        click={() => { isRating && this.changeRate(index + 1); }}
                    />
                ))}
                {num2 ?
                    <SvgIcon
                        iconClass="rate-half"
                        propClass="icon-rate"
                    /> : ''}
                {(new Array(num1)).fill(10).map((item, index) => (
                    <SvgIcon
                        key={index + item}
                        iconClass="rate-no"
                        propClass="icon-rate"
                        click={() => { isRating && this.changeRate(index + 1 + num0); }}
                    />
                ))}
            </div>
        );
    }
}

Rate.defaultProps = {
    isRating: false,
    style: {}
};

Rate.propTypes = {
    rate: Proptypes.number,
    isRating: Proptypes.bool,
    style: Proptypes.object,
    rating: Proptypes.func
};

export default Rate;
