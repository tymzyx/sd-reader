import React, { Component } from 'react';
import Proptypes from 'prop-types';
import classNames from 'classnames';

import './TabElement.scss';
import SvgIcon from "../SvgIcon";

class TabElement extends Component {
    render() {
        const { tab, isActive, gap } = this.props;

        return (
            <div
                className={classNames(
                    'tab-element',
                    {
                        'tab-element-active': isActive
                    }
                )}
                onClick={(e) => {
                    this.props.click && this.props.click(tab, e);
                }}
            >
                {!tab.svg ? (
                    <h4>{tab.title}</h4>
                ) : (
                    <SvgIcon
                        iconClass={tab.svg}
                        propClass={classNames(
                            'tab-icon',
                            {
                                'tab-icon-active': isActive
                            }
                        )}
                    />
                )}
                <span style={{ marginTop: gap || 0 }}>{tab.name}</span>
            </div>
        );
    }
}

TabElement.propTypes = {
    tab: Proptypes.object,
    isActive: Proptypes.bool,
    gap: Proptypes.number,
    click: Proptypes.func
};

export default TabElement;
