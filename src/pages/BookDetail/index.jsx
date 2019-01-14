import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavBar } from 'antd-mobile';
import { Rank, SvgIcon } from '../../components';

import './BookDetail.scss';

const mockImg = require("../../assets/image/book-cover.jpg");

class BookDetail extends Component {
    render() {
        const { bookInfo } = this.props;
        const { title, author } = bookInfo;

        return (
            <div className="book-detail-wrapper">
                <section className="book-detail-head common-title">
                    <NavBar mode="light">
                        图书详情
                    </NavBar>
                </section>
                <section className="book-detail-main">
                    <div className="detail-head">
                        <img src={mockImg} className="book-image" />
                        <div className="detail-head-collection">
                            <h4>书名书名书名书名</h4>
                            <span>作者作者作者</span>
                            <Rank rank={3.5} />
                        </div>
                        <div className="detail-head-foot">
                            <div>
                                <SvgIcon iconClass="envelope" propClass="icon-comment" />
                                <span>29</span>
                            </div>
                            <div>
                                <SvgIcon iconClass="eye" propClass="icon-eye" />
                                <span>11203</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

BookDetail.defaultProps = {
    bookInfo: {}
};

BookDetail.propTypes = {
    bookInfo: PropTypes.object
};

export default BookDetail;
