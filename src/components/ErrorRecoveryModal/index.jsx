import React, { Component } from 'react';
import { Modal, Toast } from 'antd-mobile';

import './ErrorRecovery.scss';

const errorOptions = [
    { label: '无法下载', key: '0' },
    { label: '不完整', key: '1' },
    { label: '排版混乱', key: '2' },
    { label: '图片缺失', key: '3' },
    { label: '涉黄', key: '4' },
    { label: '无法打开', key: '5' },
    { label: '涉政', key: '6' },
    { label: '其他', key: '7' }
];

class ErrorRecovery extends Component {
    constructor(props) {
        super(props);
        this.selected = [];
    }

    onChange = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            this.selected.push(value);
        } else {
            this.selected.splice(this.selected.indexOf(value), 1);
        }
    };

    submit = () => {
        if (this.selected.length) {
            console.log('submit', this.selected);
        } else {
            Toast.info('请选择纠错原因', 2);
        }
    };

    render() {
        return (
            <Modal
                {...this.props}
                title="纠错"
                transparent
                className="recovery-error-modal"
            >
                <div className="recovery-modal-box">
                    <form className="checkbox-form">
                        {errorOptions.map((item, index) => (
                            <div
                                key={item.key}
                                className="label-option"
                                style={{
                                    borderBottom: index === errorOptions.length - 1 ? '' : '1px solid #eee'
                                }}
                            >
                                <span>{item.label}</span>
                                <input
                                    name="error"
                                    type="checkbox"
                                    value={item.key}
                                    onChange={this.onChange}
                                />
                            </div>
                        ))}
                    </form>
                    <div className="recovery-modal-submit">
                        <div className="modal-cancel" onClick={() => { this.props.close(); }}>取消</div>
                        <div className="modal-submit" onClick={this.submit}>确定</div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default ErrorRecovery;
