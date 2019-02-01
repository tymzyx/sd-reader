import React, { Component } from 'react';
import { PullToRefresh } from 'antd-mobile';
import { PageBar, DetailComment, Gap, Comment, CommentInput } from '../../components';

import './CommentDetail.scss';

const avatar = require('../../assets/image/default-avatar.png');

const mockComments = (new Array(20)).fill(1);

class CommentDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false
        };
    }

    render() {
        const { refreshing } = this.state;

        return (
            <div className="comment-detail-wrapper">
                <section className="common-title">
                    <PageBar title="详情" mode="light" isLeft />
                </section>
                <section className="comment-detail-main">
                    <PullToRefresh
                        direction="down"
                        refreshing={refreshing}
                        onRefresh={() => {
                            // this.setState({ refreshing: true });
                            setTimeout(() => {
                                this.setState({ refreshing: false });
                            }, 1000);
                        }}
                        damping={40}
                    >
                        <div className="common-pull-box comment-body">
                            <DetailComment
                                username="小不懂"
                                time="2019-01-22"
                                commentContent="好书！"
                                rate={4.5}
                                avatar={avatar}
                            />
                            <Gap />
                            <div className="user-comment-box">
                                {mockComments.map((item, index) => (
                                    <Comment
                                        username="user"
                                        time="2019-01-22"
                                        avatar={avatar}
                                        key={item + index}
                                    >
                                        好书!
                                    </Comment>
                                ))}
                            </div>
                        </div>
                    </PullToRefresh>
                </section>
                <CommentInput />
            </div>
        );
    }
}

export default CommentDetail;
