import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from './index';
import Rate from '../Rate';
import SvgIcon from '../SvgIcon';

import './BriefComment.scss';

class BriefComment extends Component {
    footerNode = () => (
        <div className="footer-extra-wrapper">
            <div className="footer-extra-item">
                <SvgIcon iconClass="zan" propClass="footer-extra-icon" />
                <span>赞</span>
            </div>
            <div className="footer-extra-item">
                <SvgIcon iconClass="envelope" propClass="footer-extra-icon" />
                <span>评论</span>
            </div>
        </div>
    );

    render() {
        const { commentContent, rate } = this.props;

        return (
            <Comment
                {...this.props}
                headerExtra={<Rate rate={rate} />}
                footerExtra={this.footerNode()}
            >
                <div>
                    {commentContent}
                </div>
            </Comment>
        );
    }
}

BriefComment.propTypes = {
    username: PropTypes.string,
    avatar: PropTypes.node,
    time: PropTypes.string,
    commentContent: PropTypes.string,
    rate: PropTypes.number
};

export default BriefComment;
