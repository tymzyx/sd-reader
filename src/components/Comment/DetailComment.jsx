import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from './index';
import Rate from '../Rate';

import './DetailComment.scss';
import SvgIcon from "../SvgIcon";

const mockImg = require('../../assets/image/book-cover.jpg');

class DetailComment extends Component {
    footerNode = () => (
        <div className="footer-extra-wrapper">
            <div className="footer-extra-item">
                <SvgIcon iconClass="zan" propClass="footer-extra-icon" />
                <span>0</span>
            </div>
        </div>
    );

    render() {
        const { commentContent, rate } = this.props;

        return (
            <Comment
                {...this.props}
                footerExtra={this.footerNode()}
            >
                <div className="detail-comment-slot">
                    <p>{commentContent}</p>
                    <div className="comment-book">
                        <div className="comment-book-rate"><span>本书评价：</span><Rate rate={rate} /></div>
                        <div className="comment-book-box">
                            <img className="comment-book-img" src={mockImg} alt="" />
                            <div>
                                <h5>我们仨</h5>
                                <span>杨绛</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Comment>
        );
    }
}

DetailComment.propTypes = {
    username: PropTypes.string,
    avatar: PropTypes.node,
    time: PropTypes.string,
    commentContent: PropTypes.string,
    rate: PropTypes.number
};

export default DetailComment;
