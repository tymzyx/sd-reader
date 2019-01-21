import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavBar, Card, Button } from 'antd-mobile';
import { Rate, SvgIcon, BookTag, HeadBar } from '../../components';

import './BookDetail.scss';

const mockImg = require("../../assets/image/book-cover.jpg");

class BookDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFold: true
        };
    }

    shareTitle = () => {
        const share = 'test';
        return (
            <span className="share-user"><strong>{share}</strong>分享此书</span>
        );
    };

    shareAvatar = () => {
        const avatar = require('../../assets/image/default-avatar.png');
        return (
            <img src={avatar} className="share-avatar" />
        );
    };

    switchFold = () => {
        this.setState({
            isFold: !this.state.isFold
        });
    };

    render() {
        const { isFold } = this.state;
        const { bookInfo } = this.props;
        console.log(bookInfo);
        // const { title, author, brief } = bookInfo;
        const mockBrief = '简介内容'.repeat(50);

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
                            <Rate rank={3.5} />
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
                    <div className="detail-body">
                        <div className="detail-share">
                            <Card>
                                <Card.Header
                                    title={this.shareTitle()}
                                    thumb={this.shareAvatar()}
                                    extra="1M"
                                />
                            </Card>
                        </div>
                        <div className="detail-brief">
                            <h4>简介</h4>
                            <div className="brief-body">
                                {mockBrief.length > 100 && isFold ? (
                                    <React.Fragment>
                                        <span>{`${mockBrief.substring(0, 100)}...`}</span>
                                        <SvgIcon click={this.switchFold} iconClass="arrow" propClass="icon-arrow-unfold" />
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <span>{mockBrief}</span>
                                        {
                                            mockBrief.length > 100 &&
                                            <SvgIcon click={this.switchFold} iconClass="arrow" propClass="icon-arrow-fold" />
                                        }
                                    </React.Fragment>
                                )}
                            </div>
                        </div>
                        <div className="detail-recommend">
                            <HeadBar title="猜你喜欢" extra="换一换" type="middle" />
                            <div className="recommend-body">
                                <BookTag />
                                <BookTag />
                                <BookTag />
                                <BookTag />
                            </div>
                        </div>
                        <Button />
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
