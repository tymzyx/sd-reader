import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd-mobile';
import {
    TabElement,
    SvgIcon,
    HeadBar,
    PageBar,
    Gap,
    Tag,
    CardItem,
    BookTag,
    BookListItem
} from '../../../components';
import { categoryTags, rankList } from '../../../utils/variables';

import './Find.scss';

const avatar = require('../../../assets/image/default-avatar.png');
const subjectImg = require('../../../assets/image/subject.jpg');

const headTabs = [
    { name: '书摘', svg: 'abstract', url: '' },
    { name: '广场', svg: 'talk', url: '' },
    { name: '书店', svg: 'building', url: '' }
];

class Find extends Component {
    constructor(props) {
        super(props);
        this.searchBook = this.searchBook.bind(this);
    }

    topicAvatar = () => (
        <img src={avatar} className="topic-avatar" alt="" />
    );

    toPage = (url, params) => {
        url && this.props.history.push({ pathname: url, params });
    };

    itemExtra = () => (
        <span className="item-share">由 <strong>大道希音</strong> 分享</span>
    );

    searchBook() {
        console.log(this.props);
        this.props.history.push("/search");
    }

    render() {
        return (
            <div className="find-wrapper">
                <section className="find-title common-title">
                    <PageBar mode="light" title="找书" />
                </section>
                <section className="find-head-section">
                    <div className="find-search-bar" onClick={this.searchBook}>
                        <SvgIcon iconClass="search" propClass="icon-search" />
                        <div className="search-bar-text">
                            共有360153本书
                        </div>
                    </div>
                    <div className="find-head-tab tab-wrapper">
                        {headTabs.map((item, index) => (
                            <TabElement
                                key={index}
                                tab={item}
                                isActive
                            />
                        ))}
                    </div>
                </section>
                <Gap />
                <section className="find-main-section">
                    <div className="find-topic">
                        <HeadBar title="话题" isIcon extra="更多" extraClick={this.toPage} />
                        <div className="topic-card">
                            <Card>
                                <Card.Header
                                    title="书大痴"
                                    thumb={this.topicAvatar()}
                                />
                                <Card.Body>
                                    <span>你有什么看起来高大上，实际上并没有什么用的技能？</span>
                                </Card.Body>
                                <Card.Footer extra="火热讨论中" />
                            </Card>
                        </div>
                    </div>
                    <div className="find-category">
                        <HeadBar title="分类" isIcon extra="更多" extraClick={this.toPage} />
                        <div className="category-box">
                            {categoryTags.map((item, index) => (
                                <Tag key={index} style={{ marginBottom: 14 }}>
                                    {item.name}
                                </Tag>
                            ))}
                        </div>
                    </div>
                    <div className="find-subject">
                        <HeadBar title="专题" isIcon extra="更多" extraClick={this.toPage} />
                        <div className="subject-box">
                            <img src={subjectImg} alt="" />
                            <img src={subjectImg} alt="" />
                        </div>
                    </div>
                    <div className="find-hot-novel">
                        <HeadBar
                            title="热门小说"
                            isIcon
                            extra="更多"
                            extraClick={() => { this.toPage('/hots', 'novel'); }}
                        />
                        <div className="hot-novel-box">
                            {new Array(5).fill(1).map((i, index) => (
                                <CardItem
                                    key={i + index}
                                    title="风雨浓，胭脂乱"
                                    titleAddition="尼罗式的红玫瑰白玫瑰"
                                    extra={this.itemExtra()}
                                    style={{ marginBottom: 12 }}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="find-analysis">
                        <HeadBar title="好书解读" isIcon extra="更多" extraClick={this.toPage} />
                        <div className="analysis-box">
                            <BookTag size="large" isEllipsis={false} />
                            <BookTag size="large" isEllipsis={false} />
                            <BookTag size="large" isEllipsis={false} />
                        </div>
                    </div>
                    <div className="find-hot-book">
                        <HeadBar title="热门图书" isIcon extra="更多" extraClick={this.toPage} />
                        <div className="hot-book-box">
                            <BookTag size="large" isEllipsis={false} />
                            <BookTag size="large" isEllipsis={false} />
                            <BookTag size="large" isEllipsis={false} />
                        </div>
                    </div>
                    <div className="find-recent-share">
                        <HeadBar title="最新分享" isIcon extra="更多" extraClick={this.toPage} />
                        <div className="recent-share-box">
                            {new Array(5).fill(1).map((i, index) => (
                                <CardItem
                                    key={i + index}
                                    title="风雨浓，胭脂乱"
                                    titleAddition="尼罗式的红玫瑰白玫瑰"
                                    extra={this.itemExtra()}
                                    style={{ marginBottom: 12 }}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="find-book-list">
                        <HeadBar title="书单" isIcon extra="更多" extraClick={this.toPage} />
                        {new Array(3).fill(1).map((i, index) => (
                            <div key={i + index} className="book-list-box">
                                <BookListItem
                                    title="一座城市，一本书"
                                    number={7}
                                    describe="如果让你为自己喜欢的城市写一本书，你会怎么形容你心中的那座城市？"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="find-rank">
                        <HeadBar title="榜单" isIcon extra="更多" extraClick={() => { this.toPage('/ranks', 0); }} />
                        <div className="rank-box">
                            {rankList.map((item, index) => (
                                <div
                                    key={index}
                                    className="rank-type"
                                    style={{ backgroundColor: item.color }}
                                    onClick={() => { this.toPage('/ranks', index); }}
                                >
                                    <h4>{item.name}</h4>
                                    <span
                                        className="rank-go"
                                        style={{ color: item.color }}
                                    >
                                        {'GO>'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

Find.propTypes = {
    history: PropTypes.any
};

export default Find;
