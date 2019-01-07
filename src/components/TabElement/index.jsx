import React, { Component } from 'react';
import Proptypes from 'prop-types';

import './TabElement.scss';
import SvgIcon from "../SvgIcon";

class TabElement extends Component {
    render() {
        const { tab } = this.props;

        return (
            <div className="tab-element">
                {!tab.svg ? (
                    <h4>{tab.title}</h4>
                ) : (
                    <SvgIcon iconClass={tab.svg} propClass="tab-icon" />
                )}
                <span>{tab.name}</span>
            </div>
        );
    }
}

TabElement.propTypes = {
    tab: Proptypes.object
};

export default TabElement;
