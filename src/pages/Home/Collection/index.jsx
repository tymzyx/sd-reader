import React, { Component } from 'react';
import Upload from 'rc-upload';
import { Modal } from 'antd-mobile';
import { BookTag, PageBar } from '../../../components';

import './Collection.scss';

class Collection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            operationModal: false
        };
    }

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
        const { operationModal } = this.state;
        return (
            <div className="collection-wrapper">
                <section className="common-title">
                    <PageBar mode="light" title="藏书" />
                </section>
                <section className="collection-main">
                    <div className="collection-book">
                        <BookTag isEllipsis={false} />
                    </div>
                    <div className="collection-book">
                        <BookTag isEllipsis={false} />
                    </div>
                    <div className="collection-book">
                        <BookTag isEllipsis={false} />
                    </div>
                    <div className="collection-book">
                        <BookTag isEllipsis={false} />
                    </div>
                    <div
                        className="collection-operation"
                        onClick={() => {
                            this.setState({
                                operationModal: true
                            });
                        }}
                    >
                        <div className="operation-row" />
                        <div className="operation-column" />
                    </div>
                </section>
                <Modal
                    visible={operationModal}
                    transparent
                    onClose={() => {
                        this.setState({
                            operationModal: false
                        });
                    }}
                    className="collection-modal"
                >
                    <div className="collection-modal-box">
                        <div className="modal-item modal-item-border">
                            <h5>前往找书</h5>
                            <span>看看大神们都推荐了啥</span>
                        </div>
                        <div className="modal-item modal-item-border">
                            <h5>搜索书籍</h5>
                            <span>在百万藏书中找到你心仪的那一本</span>
                        </div>
                        <Upload
                            name="book"
                            action="/api/book/upload"
                            data={{ author: 'test', name: 'test' }}
                            beforeUpload={this.beforeUpload}
                            onStart={this.onStart}
                            onSuccess={this.onSuccess}
                            onProgress={this.onProgress}
                            onError={this.onError}
                        >
                            <div className="modal-item">
                                <h5>上传书籍</h5>
                                <span>让每一本书籍都汇入私人定制藏书馆</span>
                            </div>
                        </Upload>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Collection;
