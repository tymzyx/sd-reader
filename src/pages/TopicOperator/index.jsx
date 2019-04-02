import React, { Component } from 'react';
import { createForm } from 'rc-form';
import { List, InputItem, TextareaItem, Button } from 'antd-mobile';
import { PageBar } from '../../components';

import './TopicOperator.scss';

class TopicOperator extends Component {
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div className="topic-operator-wrapper">
                <PageBar isLeft mode="light" />
                <div className="topic-operator-main">
                    <form>
                        <List renderHeader={() => '新建话题'}>
                            <InputItem
                                {...getFieldProps('title', {
                                    rules: [{ required: true }],
                                    initialValue: ''
                                })}
                                placeholder="请输入话题名称"
                            >
                                <span><strong>*</strong>话题名称</span>
                            </InputItem>
                            <TextareaItem
                                rows={2}
                                {...getFieldProps('content', {
                                    rules: [{ required: true }],
                                    initialValue: ''
                                })}
                                title={(<span><strong>*</strong>话题内容</span>)}
                                placeholder="添加内容，50个字以内"
                            />
                        </List>
                        <div className="topic-operator-submit">
                            <Button type="warning">删除</Button>
                            <Button type="primary">提交</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default createForm()(TopicOperator);
