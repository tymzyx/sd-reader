import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'antd-mobile';
import { Rate, SvgIcon, BookTag, HeadBar, BriefComment, PageBar, ErrorRecovery } from '../../components';
import { bookDetail } from '../../api/request';

import './BookDetail.scss';

const mockImg = require('../../assets/image/book-cover.jpg');
const avatar = require('../../assets/image/default-avatar.png');

class BookDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFold: true,
            bookInfo: {},
            recoveryVisible: false
        };
    }

    componentWillMount() {
        let bookId = this.props.location.id;
        bookId = bookId || 'c4ec5791-506a-11e9-8465-38c9861033db';
        this.fetchBookInfo(bookId);
    }

    fetchBookInfo = async (bookId) => {
        try {
            const data = await bookDetail({ bookId });
            this.setState({
                bookInfo: data
            });
        } catch (err) {
            console.log('err', err);
        }
    };

    shareTitle = () => {
        const { share } = this.state.bookInfo;
        return (
            <span className="share-user"><strong>{share}</strong>分享此书</span>
        );
    };

    shareAvatar = () => (
        <img src={avatar} className="share-avatar" alt="" />
    );

    headRightNode = () => (
        <div className="head-right-content">
            <SvgIcon iconClass="edit" propClass="icon-edit" />
            <SvgIcon
                iconClass="error-msg"
                propClass="icon-error"
                click={() => { this.setState({ recoveryVisible: true }); }}
            />
        </div>
    );

    commentNode = () => (
        <div className="comment-head-note">
            <SvgIcon iconClass="note" propClass="icon-comment-note" />
            <span>评论</span>
        </div>
    );

    switchFold = () => {
        this.setState({
            isFold: !this.state.isFold
        });
    };

    switchPage = (path) => {
        this.props.history.push(path);
    };

    render() {
        const { isFold, bookInfo, recoveryVisible } = this.state;
        const { title, author, score, readers, comments, image } = bookInfo;
        let { brief = '' } = bookInfo;
        brief = brief || '内容太精彩了，我只能说这么多！';
        const isCache = true;
        const pathname = isCache ? '/reader' : '';

        return (
            <div className="book-detail-wrapper">
                <section className="book-detail-head common-title">
                    <PageBar
                        mode="light"
                        title="图书详情"
                        isLeft
                        right={this.headRightNode()}
                    />
                </section>
                <section className="book-detail-main">
                    <div className="detail-head">
                        <img src={image || mockImg} className="book-image" alt="" />
                        <div className="detail-head-collection">
                            <h4>{title}</h4>
                            <span>{author}</span>
                            <Rate rate={+score} />
                        </div>
                        <div className="detail-head-foot">
                            <div>
                                <SvgIcon iconClass="envelope" propClass="icon-comment" />
                                <span>{comments || 0}</span>
                            </div>
                            <div>
                                <SvgIcon iconClass="eye" propClass="icon-eye" />
                                <span>{readers}</span>
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
                                {brief.length > 100 && isFold ? (
                                    <React.Fragment>
                                        <span>{`${brief.substring(0, 100)}...`}</span>
                                        <div style={{ alignSelf: 'center' }}>
                                            <SvgIcon
                                                click={this.switchFold}
                                                iconClass="arrow"
                                                propClass="icon-arrow-unfold"
                                            />
                                        </div>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <span>{brief}</span>
                                        {
                                            brief.length > 100 && (
                                                <div style={{ alignSelf: 'center' }}>
                                                    <SvgIcon
                                                        click={this.switchFold}
                                                        iconClass="arrow"
                                                        propClass="icon-arrow-fold"
                                                    />
                                                </div>
                                            )
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
                        <div className="detail-comments">
                            <HeadBar title="书评" extra={this.commentNode()} type="middle" />
                            <div className="comment-body">
                                <BriefComment
                                    username="小不懂"
                                    time="2019-01-22"
                                    commentContent="好书！"
                                    rate={4.5}
                                    avatar={avatar}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="book-detail-footer">
                    <Button icon={<SvgIcon iconClass="heart" propClass="icon-wish" />}>
                        心愿单
                    </Button>
                    <Button
                        type="primary"
                        icon={<SvgIcon iconClass="abstract" propClass="icon-borrow" />}
                        onClick={(e) => { this.switchPage(pathname, e); }}
                    >
                        {!isCache ? '免费借阅' : '开始阅读'}
                    </Button>
                </section>
                <section className="book-detail-tip">
                    <span>支持SD平台</span>
                    <span>变身VIP</span>
                </section>
                <ErrorRecovery
                    visible={recoveryVisible}
                    onClose={() => {
                        this.setState({
                            recoveryVisible: false
                        });
                    }}
                    close={() => {
                        this.setState({
                            recoveryVisible: false
                        });
                    }}
                />
            </div>
        );
    }
}

BookDetail.propTypes = {
    history: PropTypes.any,
    location: PropTypes.any
};

export default BookDetail;
