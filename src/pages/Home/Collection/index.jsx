import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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

    toPage = (url) => {
        this.props.history.push({ pathname: url });
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
                        <div className="modal-item" onClick={() => { this.toPage('/upload'); }}>
                            <h5>上传书籍</h5>
                            <span>让每一本书籍都汇入私人定制藏书馆</span>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

Collection.propTypes = {
    history: PropTypes.any
};

export default withRouter(Collection);
