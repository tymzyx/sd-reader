import React, { Component } from 'react';
import { NavBar, InputItem, Button, List } from 'antd-mobile';
import { SvgIcon } from '../../components';

import './Register.scss';

class Register extends Component {
    render() {
        return (
            <div className="register-wrapper">
                <div className="register-head">
                    <NavBar mode="light" />
                </div>
                <div className="register-body">
                    <SvgIcon iconClass="book" propClass="icon-book-logo" />
                    <section className="register-form">
                        <InputItem
                            placeholder="请输入手机号"
                        />
                        <InputItem
                            placeholder="请输入密码"
                        />
                        <InputItem
                            placeholder="请输入验证码"
                        />
                        <span>获取验证码</span>
                        <Button>
                            下一步
                        </Button>
                        <span>我已同意服务协议</span>
                    </section>
                </div>
            </div>
        );
    }
}

export default Register;
