import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, InputItem, TextareaItem, Picker, Button } from 'antd-mobile';
import Upload from 'rc-upload';
import { createForm } from 'rc-form';
import { PageBar } from '../../components';

import './BookUpload.scss';

const bookType = [
    { value: 'novel', label: '小说' },
    { value: 'literature', label: '文学' },
    { value: 'success', label: '成功' },
    { value: 'marketing', label: '营销管理' },
    { value: 'economy', label: '经济' },
    { value: 'computer', label: '计算机' },
    { value: 'science', label: '科普' },
    { value: 'social', label: '社科' },
    { value: 'zjf', label: '政军法' },
    { value: 'philosophy', label: '哲学' }
];

class BookUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            uploadExtra: {}
        };
    }

    formChange = (val, type) => {
        this.props.form.validateFields((error, value) => {
            if (error) {
                if (Object.keys(error).length === 1 && Object.keys(error)[0] === type) {
                    this.setState({
                        disabled: false,
                        uploadExtra: {
                            ...value,
                            type: value.type ? value.type[0] : val[0]
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
                        uploadExtra: {
                            ...value,
                            type: value.type[0]
                        }
                    });
                }
            }
        });
    };

    beforeUpload = (file) => {
        console.log('beforeUpload', file.name);
    };

    onStart = (file) => {
        console.log('onStart', file.name);
        // this.refs.inner.abort(file);
    };

    onSuccess = (file) => {
        console.log('onSuccess', file);
    };

    onProgress = (step, file) => {
        console.log('onProgress', Math.round(step.percent), file.name);
    };

    onError = (err) => {
        console.log('onError', err);
    };

    render() {
        const { disabled, uploadExtra } = this.state;
        const { getFieldProps } = this.props.form;

        return (
            <div className="book-upload-wrapper">
                <PageBar
                    mode="light"
                    isLeft
                />
                <div className="book-upload-main">
                    <List renderHeader={() => '书籍基本信息'}>
                        <InputItem
                            {...getFieldProps('title', {
                                onChange: (val) => { this.formChange(val, 'title'); },
                                rules: [{ required: true }]
                            })}
                            placeholder="请输入书名"
                        >
                            <span><strong>*</strong>书名</span>
                        </InputItem>
                        <InputItem
                            {...getFieldProps('author', {
                                onChange: (val) => { this.formChange(val, 'author'); },
                                rules: [{ required: true }]
                            })}
                            placeholder="请输入作者"
                        >
                            <span><strong>*</strong>作者</span>
                        </InputItem>
                        <Picker
                            data={bookType}
                            cols={1}
                            {...getFieldProps('type', {
                                onChange: (val) => { this.formChange(val, 'type'); },
                                rules: [{ required: true }]
                            })}
                        >
                            <List.Item arrow="horizontal">
                                <span><strong>*</strong>类型</span>
                            </List.Item>
                        </Picker>
                        <TextareaItem
                            rows={3}
                            {...getFieldProps('brief')}
                            title="简介"
                            placeholder="简介，100个字以内"
                        />
                    </List>
                    <div className="upload-btn">
                        <Upload
                            ref="uploader"
                            name="book"
                            action="/api/book/upload"
                            data={{ ...uploadExtra, share: 'sl' }}
                            beforeUpload={this.beforeUpload}
                            onStart={this.onStart}
                            onSuccess={this.onSuccess}
                            onProgress={this.onProgress}
                            onError={this.onError}
                            disabled={disabled}
                        >
                            <Button
                                type="primary"
                                disabled={disabled}
                            >
                                上传
                            </Button>
                        </Upload>
                    </div>
                </div>
            </div>
        );
    }
}

BookUpload.propTypes = {
    form: PropTypes.any
};

export default createForm()(BookUpload);
