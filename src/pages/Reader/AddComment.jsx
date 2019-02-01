import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, TextareaItem } from 'antd-mobile';
import { Rate } from '../../components';

import './AddComment.scss';

class AddComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rate: 5
        };
    }

    render() {
        const { rate } = this.state;
        const { cancel } = this.props;

        return (
            <div className="add-comment-wrapper">
                <div className="add-comment-rate">
                    <span>内容质量</span>
                    <Rate
                        isRating
                        rating={(num) => { this.setState({ rate: num }); }}
                        rate={rate}
                        style={{ flex: 1, padding: '0 80px 0 20px' }}
                    />
                    <span onClick={() => { cancel && cancel(); }}>取消</span>
                </div>
                <List>
                    <TextareaItem
                        rows={8}
                        count={100}
                        placeholder="请输入..."
                    />
                </List>
            </div>
        );
    }
}

AddComment.propTypes = {
    cancel: PropTypes.func
};

export default AddComment;
