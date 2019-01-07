import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabElement from '../TabElement/index';

import './BottomTab.scss';

class BottomTab extends Component {
    render() {
        const { tabs } = this.props;

        return (
            <div className="bottom-tab-wrapper tab-wrapper">
                {tabs.map((tab, index) => (
                    <TabElement key={index} tab={tab} />
                ))}
            </div>
        );
    }
}

BottomTab.defaultProps = {
    tabs: []
};

BottomTab.propTypes = {
    tabs: PropTypes.array
};

export default BottomTab;
