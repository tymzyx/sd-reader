import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, InputItem, TextareaItem, Picker, Button } from 'antd-mobile';
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
    render() {
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
                            {...getFieldProps('title')}
                            placeholder="请输入书名"
                        >
                            书名
                        </InputItem>
                        <InputItem
                            {...getFieldProps('author')}
                            placeholder="请输入作者"
                        >
                            作者
                        </InputItem>
                        <Picker data={bookType} cols={1} {...getFieldProps('type')}>
                            <List.Item arrow="horizontal">类型</List.Item>
                        </Picker>
                        <TextareaItem
                            rows={3}
                            {...getFieldProps('brief')}
                            title="简介"
                            placeholder="简介，100个字以内"
                        />
                    </List>
                    <div className="upload-btn">
                        <Button type="primary">
                            上传
                        </Button>
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
