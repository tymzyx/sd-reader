import React, { Component } from 'react';
import { Card } from 'antd-mobile';
import { SvgIcon, HeadBar, PageBar, Gap, Tag, CardItem } from '../../../components';

import './Find.scss';
import TabElement from "../../../components/TabElement";

const avatar = require('../../../assets/image/default-avatar.png');
const subjectImg = require('../../../assets/image/subject.jpg');

const headTabs = [
    { name: '书摘', svg: 'abstract', url: '' },
    { name: '广场', svg: 'talk', url: '' },
    { name: '书店', svg: 'building', url: '' }
];

const categoryTags = [
    { name: '小说', key: 'novel', url: '' },
    { name: '文学', key: 'literature', url: '' },
    { name: '成功', key: 'success', url: '' },
    { name: '营销管理', key: 'marketing', url: '' },
    { name: '经济', key: 'economy', url: '' },
    { name: '计算机', key: 'computer', url: '' },
    { name: '科普', key: 'science', url: '' },
    { name: '社科', key: 'social', url: '' }
];

class Find extends Component {
    topicAvatar = () => (
        <img src={avatar} className="topic-avatar" alt="" />
    );

    toPage = () => {
        console.log(123);
    };

    hotExtra = () => (
        <span className="hot-share">由 <strong>大道希音</strong> 分享</span>
    );

    render() {
        return (
            <div className="find-wrapper">
                <section className="find-title common-title">
                    <PageBar mode="light" title="找书" />
                </section>
                <section className="find-head-section">
                    <div className="find-search-bar">
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
                        <HeadBar title="热门小说" isIcon extra="更多" extraClick={this.toPage} />
                        <div className="hot-novel-box">
                            {new Array(10).fill(1).map((i, index) => (
                                <CardItem
                                    key={i + index}
                                    title="风雨浓，胭脂乱"
                                    titleAddition="尼罗式的红玫瑰白玫瑰"
                                    extra={this.hotExtra()}
                                    style={{ marginBottom: 8 }}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="find-analysis">
                        <HeadBar title="好书解读" isIcon extra="更多" extraClick={this.toPage} />
                    </div>
                    <div className="find-hot-book">
                        <HeadBar title="热门图书" isIcon extra="更多" extraClick={this.toPage} />
                    </div>
                </section>
            </div>
        );
    }
}

export default Find;
