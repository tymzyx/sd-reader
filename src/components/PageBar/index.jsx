import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import SvgIcon from "../SvgIcon";
import classNames from 'classnames';

import './PageBar.scss';

class PageBar extends Component {
    defaultLeft = () => (
        <SvgIcon
            iconClass="arrow"
            propClass="icon-arrow-back"
            click={() => { this.props.history.goBack(); }}
        />
    );

    render() {
        const { mode, title, isLeft, left, right, isOpacity } = this.props;

        return (
            <div
                className={classNames([
                    'page-bar-wrapper',
                    {
                        'nav-bar-opacity': isOpacity
                    }
                ])}
            >
                <NavBar
                    leftContent={isLeft && (left || this.defaultLeft())}
                    rightContent={right}
                    mode={mode}
                >
                    {title ? <>{title}</> : (
                        this.props.children
                    )}
                </NavBar>
            </div>
        );
    }
}

PageBar.propTypes = {
    mode: PropTypes.string,
    left: PropTypes.node,
    isLeft: PropTypes.bool,
    right: PropTypes.node,
    title: PropTypes.node,
    history: PropTypes.any,
    isOpacity: PropTypes.bool,
    children: PropTypes.any
};

export default withRouter(PageBar);
