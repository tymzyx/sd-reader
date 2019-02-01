import React, { Component } from 'react';
import { List, InputItem } from 'antd-mobile';
import SvgIcon from '../SvgIcon';

import './CommentInput.scss';

class CommentInput extends Component {
    render() {
        return (
            <div className="comment-input-wrapper">
                <List>
                    <InputItem
                        placeholder="说点什么..."
                    />
                </List>
                <SvgIcon iconClass="plane" propClass="icon-plane" />
            </div>
        );
    }
}

export default CommentInput;
