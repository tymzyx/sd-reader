import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { NavBar, InputItem, Button, Radio, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { SvgIcon } from '../../components';
import { registerApi } from '../../api/request';

import './Register.scss';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eyeOpen: false,
            isAgreement: true
        };
    }

    submit = () => {
        this.props.form.validateFields(async (error, value) => {
            if (error) {
                if (error.mobile) {
                    Toast.info('请输入正确的手机号码', 2);
                } else if (error.password) {
                    Toast.info('密码长度在6-16位之间，且同时含有数字字母', 2);
                } else if (error.verifyCode) {
                    Toast.info('请输入正确的验证码', 2);
                }
            } else {
                console.log(value);
                try {
                    const data = await registerApi(value);
                    console.log('data', data);
                } catch (err) {
                    console.log('err', err);
                }
            }
        });
    };

    eyeNode = () => {
        const { eyeOpen } = this.state;
        return (
            <SvgIcon
                iconClass={eyeOpen ? 'eyeopen' : 'eyeoclose'}
                propClass="icon-eye"
                click={() => { this.setState({ eyeOpen: !eyeOpen }); }}
            />
        );
    };

    backNode = () => {
        return (
            <SvgIcon
                iconClass="arrow"
                propClass="icon-arrow-back"
                click={() => { this.props.history.goBack(); }}
            />
        );
    };

    render() {
        const { eyeOpen, isAgreement } = this.state;
        const { getFieldProps } = this.props.form;

        return (
            <div className="register-wrapper">
                <div className="register-head">
                    <NavBar
                        mode="light"
                        leftContent={this.backNode()}
                    />
                </div>
                <div className="register-body">
                    <SvgIcon iconClass="book" propClass="icon-book-logo" />
                    <section className="register-form form-box">
                        <InputItem
                            type="text"
                            className="item-input"
                            placeholder="请输入手机号"
                            {...getFieldProps('mobile', {
                                trigger: 'onBlur',
                                rules: [{ required: true, pattern: /^1[34578]\d{9}$/ }]
                            })}
                        />
                        <InputItem
                            type={eyeOpen ? 'text' : 'password'}
                            className="item-input"
                            placeholder="请输入密码"
                            extra={this.eyeNode()}
                            {...getFieldProps('password', {
                                trigger: 'onBlur',
                                rules: [{
                                    required: true,
                                    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
                                }]
                            })}
                        />
                        <div className="verify-code-item">
                            <InputItem
                                className="item-input"
                                placeholder="请输入验证码"
                                {...getFieldProps('verifyCode', {
                                    trigger: 'onBlur',
                                    rules: [{ required: true }]
                                })}
                            />
                            <span>获取验证码</span>
                        </div>
                        <div className="confirm-btn-item">
                            <Button
                                className="login-btn"
                                onClick={this.submit}
                                disabled={!isAgreement}
                            >
                                注册
                            </Button>
                        </div>
                        <Radio
                            className="my-radio"
                            checked={isAgreement}
                            onClick={() => this.setState({ isAgreement: !isAgreement })}
                        >
                            我已同意服务协议
                        </Radio>
                    </section>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    form: PropTypes.any
};

export default createForm()(withRouter(Register));
