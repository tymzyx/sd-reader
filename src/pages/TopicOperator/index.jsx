import React, { Component } from 'react';
import { createForm } from 'rc-form';
import { List, InputItem, TextareaItem, Button, Toast, Modal } from 'antd-mobile';
import { PageBar } from '../../components';
import { topicOperate } from '../../api/request';

import './TopicOperator.scss';

const { alert } = Modal;

class TopicOperator extends Component {
    constructor(props) {
        super(props);
        this.headTitle = '新建话题';

        this.state = {
            disabled: true,
            topicInfo: {
                type: '0' // 新建
            }
        };
    }

    componentWillMount() {
        this.init();
    }

    init = () => {
        const info = this.props.location.topicInfo;
        if (info) {
            console.log(info);
            this.setState({
                topicInfo: {
                    id: info.id,
                    title: info.title,
                    type: '1', // 编辑
                    content: info.content
                },
                disabled: false
            });
            this.headTitle = '编辑话题信息';
        }
    };

    formChange = (val, type) => {
        this.props.form.validateFields((error, value) => {
            if (error) {
                if (Object.keys(error).length === 1 && Object.keys(error)[0] === type) {
                    this.setState({
                        disabled: false,
                        topicInfo: {
                            ...this.state.topicInfo,
                            ...value
                        }
                    });
                } else {
                    this.setState({
                        disabled: true
                    });
                }
            } else {
                if (val === '') {
                    this.setState({
                        disabled: true
                    });
                } else {
                    this.setState({
                        disabled: false,
                        topicInfo: {
                            ...this.state.topicInfo,
                            ...value
                        }
                    });
                }
            }
        });
    };

    submitTopic = async () => {
        const { topicInfo } = this.state;
        try {
            await topicOperate({ ...topicInfo });
            Toast.info(`${topicInfo.type === '0' ? '新建' : '编辑'}话题成功！`);
        } catch (err) {
            console.log(err);
            Toast.fail(`系统错误，${topicInfo.type === '0' ? '新建' : '编辑'}话题失败！`);
        }
    };

    deleteTopic = async () => {
        const { topicInfo } = this.state;
        try {
            await topicOperate({ id: topicInfo.id });
            Toast.info(`删除话题成功！`);
        } catch (err) {
            console.log(err);
            Toast.fail(`系统错误，删除话题失败！`);
        }
    };

    render() {
        const { disabled, topicInfo } = this.state;
        const { getFieldProps } = this.props.form;
        return (
            <div className="topic-operator-wrapper">
                <PageBar isLeft mode="light" />
                <div className="topic-operator-main">
                    <form>
                        <List renderHeader={() => this.headTitle}>
                            <InputItem
                                {...getFieldProps('title', {
                                    rules: [{ required: true }],
                                    initialValue: topicInfo.title,
                                    onChange: (val) => { this.formChange(val, 'title'); }
                                })}
                                placeholder="请输入话题名称"
                            >
                                <span><strong>*</strong>话题名称</span>
                            </InputItem>
                            <TextareaItem
                                rows={2}
                                {...getFieldProps('content', {
                                    rules: [{ required: true }],
                                    initialValue: topicInfo.content,
                                    onChange: (val) => { this.formChange(val, 'content'); }
                                })}
                                title={(<span><strong>*</strong>话题内容</span>)}
                                placeholder="添加内容，50个字以内"
                            />
                        </List>
                        <div className="topic-operator-submit">
                            {topicInfo.type === '1' && (
                                <Button
                                    type="warning"
                                    onClick={() => (
                                        alert('删除', '确定删除该话题吗？', [
                                            { text: '取消' },
                                            { text: '确定', onPress: this.deleteTopic }
                                        ])
                                    )}
                                >
                                    删除
                                </Button>
                            )}
                            <Button type="primary" disabled={disabled} onClick={this.submitTopic}>提交</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default createForm()(TopicOperator);
