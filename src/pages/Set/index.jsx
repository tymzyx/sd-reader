import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd-mobile';
import { Gap, PageBar } from '../../components';
import cookies from 'js-cookies';

import './Set.scss';

const { Item } = List;

class Set extends Component {
    logout = () => {
        cookies.removeItem('username');
        this.props.history.goBack();
    };

    render() {
        return (
            <div className="set-wrapper">
                <PageBar mode="light" title="设置" />
                <section className="set-main">
                    <List>
                        <Gap />
                        <Item>
                            <span>关于我们</span>
                        </Item>
                        <Gap />
                        <Item>
                            <span>清除缓存</span>
                        </Item>
                        <Gap />
                    </List>
                    <div className="logout-box" onClick={this.logout}>退出当前帐号</div>
                </section>
            </div>
        );
    }
}

Set.propTypes = {
    history: PropTypes.any
};

export default Set;
