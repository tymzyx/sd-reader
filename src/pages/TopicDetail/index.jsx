import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SvgIcon } from '../../components';
import { topicDetail } from '../../api/request';

import './TopicDetail.scss';

class TopicDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {}
        };
    }

    componentWillMount() {
        const initId = this.props.location.id || '1bc4aa30-5532-11e9-8004-498b3b8e17d2';
        this.fetchDetail(initId);
    }

    fetchDetail = async (id) => {
        try {
            const res = await topicDetail({ id });
            this.setState({
                detail: { ...res }
            });
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        const { detail } = this.state;
        return (
            <div className="topic-detail-wrapper">
                <section className="topic-detail-title">
                    <SvgIcon
                        iconClass="arrow"
                        propClass="icon-arrow-back"
                        click={() => { this.props.history.push('/topic'); }}
                    />
                    <SvgIcon
                        iconClass="edit"
                        propClass="icon-edit"
                        click={() => {
                            this.props.history.push({ pathname: '/topicOperator', topicInfo: detail });
                        }}
                    />
                </section>
                <section className="topic-detail-body">
                    <div className="topic-card">
                        <h4>{detail.title}</h4>
                        <div className="topic-content">
                            {detail.content}
                        </div>
                        <div className="topic-card-foot">
                            {'火热讨论中 >'}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

TopicDetail.propTypes = {
    history: PropTypes.any,
    location: PropTypes.any
};

export default TopicDetail;