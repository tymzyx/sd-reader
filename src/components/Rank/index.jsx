import React, { Component } from 'react';
import Proptypes from 'prop-types';
import SvgIcon from '../SvgIcon';

import './Rank.scss';

class Rank extends Component {
    render() {
        const { rank } = this.props;
        const num0 = Math.floor(rank);
        const num1 = Math.floor(5 - rank);
        const num2 = (rank - num0) ? 1 : 0;

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

Rank.propTypes = {
    rank: Proptypes.number
};

export default Rank;
