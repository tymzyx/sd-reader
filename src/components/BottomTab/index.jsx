import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TabElement from '../TabElement/index';

import './BottomTab.scss';

class BottomTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0
        };
    }

    componentWillMount() {
        this.setState({
            activeIndex: this.props.defaultIndex
        });
    }

    tabClick = (index, tab) => {
        this.setState({
            activeIndex: index
        });
        this.props.history.push({ pathname: tab.url });
    };

    render() {
        const { tabs } = this.props;
        const { activeIndex } = this.state;

        return (
            <div className="bottom-tab-wrapper tab-wrapper">
                {tabs.map((tab, index) => (
                    <TabElement
                        key={index}
                        tab={tab}
                        click={(tabInfo, e) => { this.tabClick(index, tabInfo, e); }}
                        isActive={index === activeIndex}
                    />
                ))}
            </div>
        );
    }
}

BottomTab.defaultProps = {
    tabs: []
};

BottomTab.propTypes = {
    tabs: PropTypes.array,
    defaultIndex: PropTypes.number,
    history: PropTypes.any
};

export default withRouter(BottomTab);
