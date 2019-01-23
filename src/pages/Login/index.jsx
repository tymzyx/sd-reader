import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { InputItem, NavBar, Icon, Button, WhiteSpace, Radio, Toast } from 'antd-mobile';
import { SvgIcon } from '../../components';
import { loginApi } from '@/api/request';
import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            eye: true,
            agree: true
        };
    }

    changeAccount = (e) => {
        this.setState({ account: e });
    }

    changePassword = (e) => {
        this.setState({ password: e });
    }

    login = async () => {
        if (!this.state.account) {
            Toast.info('请输入账号！', 2);
        } else if (!this.state.password) {
            Toast.info('请输入密码！', 2);
        } else {
            // 请求接口
            try {
                console.log('this', this);
                const res = await loginApi({ account: this.state.account, password: this.state.password });
                if (res.status === 200) {
                    Toast.success('登陆成功 !!!', 1);
                    this.props.history.push('/register');
                    // return (<Redirect to={'chat'} />);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    render() {
        return (
            <div className="login-header">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" className="left-icon" />}
                    onLeftClick={() => this.props.history.go(-1)}
                />
                <div className="login-content">
                    <div className="logo">
                        <SvgIcon iconClass="book" propClass="book" />
                    </div>
                    <div className="login-form form-box">
                        <div className="form-input">
                            <InputItem placeholder="请输入账号" className="item-input" value={this.state.account} onChange={this.changeAccount}>
                                <SvgIcon iconClass="person" propClass="input-icon" />
                            </InputItem>
                            <InputItem type={this.state.eye ? 'text' : 'password'} placeholder="请输入密码" className="item-input" value={this.state.password} onChange={this.changePassword}>
                                <SvgIcon iconClass="key" propClass="input-icon-key" />
                                <SvgIcon iconClass={this.state.eye ? 'eyeopen' : 'eyeoclose'} propClass="input-icon-eye" click={() => { this.setState({ eye: !this.state.eye }); }} />
                            </InputItem>
                            <p className="forget-password"><a href="">忘记密码？</a></p>
                            <Button className="login-btn" onClick={this.login} disabled={!this.state.agree}>登录</Button><WhiteSpace />
                            <Button type="primary" className="register login-btn" onClick={() => { this.props.history.push('./register'); }}>注册</Button><WhiteSpace />
                            <div className="agree">
                                <Radio className="my-radio" checked={this.state.agree} onClick={() => { this.setState({ agree: !this.state.agree }); }}>我已同意《藏书馆服务协议》</Radio>
                            </div>
                        </div>
                    </div>
                    <div className="other-login">
                        <p className="login-other-des">第三方账号登录</p>
                        <div className="other-login-box">
                            <a className="border-circle wechart" />
                            <a href="" className="border-circle QQ" />
                            <a href="" className="border-circle sina" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
