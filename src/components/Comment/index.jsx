import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Comment.scss';

class Comment extends Component {
    render() {
        const { username, avatar, headerExtra, time, footerExtra, border } = this.props;

        return (
            <div
                className="base-comment-wrapper"
                style={{
                    borderBottom: border ? '1px solid #ddd' : ''
                }}
            >
                <div className="comment-head">
                    <div className="comment-head-left">
                        <img src={avatar} className="user-avatar" />
                        <span>{username}</span>
                    </div>
                    <div className="comment-head-extra">
                        {headerExtra}
                    </div>
                </div>
                <div className="comment-main">
                    <div className="main-body">
                        {this.props.children}
                    </div>
                    <div className="main-foot">
                        <div>{time}</div>
                        <div>{footerExtra}</div>
                    </div>
                </div>
            </div>
        );
    }
}

Comment.propTypes = {
    username: PropTypes.string,
    avatar: PropTypes.any,
    headerExtra: PropTypes.node,
    time: PropTypes.string,
    footerExtra: PropTypes.node,
    children: PropTypes.any,
    border: PropTypes.bool
};

export default Comment;
