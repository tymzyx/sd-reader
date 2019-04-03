import React, { Component } from 'react';
import { PageBar, SvgIcon } from '../../components';
import { topicList } from '../../api/request';

import './Topic.scss';

const bgColors = [
    '#698B22',
    '#CD950C',
    '#4F4F4F',
    '#8B3E2F',
    '#27408B'
];

class Topic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: []
        };
    }

    componentWillMount() {
        this.fetchList(0);
    }

    fetchList = async (startNum) => {
        try {
            const res = await topicList({ startNum, limit: 10 });
            this.setState({
                list: res.list
            });
        } catch (err) {
            console.log('error', err);
        }
    };

    render() {
        const { list } = this.state;
        console.log(list);
        return (
            <div className="topic-wrapper">
                <section className="topic-title common-title">
                    <PageBar title="话题" isLeft mode="light" />
                </section>
                <section className="topic-body">
                    {list.map((item, index) => (
                        <div
                            key={index}
                            className="topic-card"
                            style={{ backgroundColor: bgColors[index % 5] }}
                        >
                            <div className="topic-card-head">
                                <SvgIcon iconClass="cup" propClass="icon-cup" />
                            </div>
                            <h4 className="topic-card-title">{item.title}</h4>
                            <div className="topic-card-word">{item.content}</div>
                            <div className="topic-card-foot">
                                {`火热讨论中 >`}
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        );
    }
}

export default Topic;
