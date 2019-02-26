import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List } from 'antd-mobile';
import { SvgIcon, PageBar, Gap } from '../../../components';
import TabElement from '../../../components/TabElement';

import './Mine.scss';

const { Item } = List;
const { Brief } = Item;
const svg = (iconClass, propClass) => (
    <SvgIcon iconClass={iconClass} propClass={propClass} />
);
const gap = (key, text) => (
    <div key={key} className={text === 'gap' ? 'mine-main-gap' : 'mine-end-gap'} />
);
const baseExtra = () => (
    <div className="vip-tip">
        试用已结束，点击加入vip
    </div>
);
const baseTabs = [
    { text: '动态', key: 'updating' },
    { text: '关注', key: 'following' },
    { text: '粉丝', key: 'follower' }
];

const mainList = [
    { text: '充值', svg: 'recharge' },
    { text: '已购', svg: 'bag' },
    { text: 'gap' },
    { text: '消息提醒', svg: 'envelope' },
    { text: 'gap' },
    { text: '笔记', svg: 'note' },
    { text: '档案', svg: 'folder' },
    { text: 'gap' },
    { text: '心愿单', svg: 'heart' },
    { text: '阅历', svg: 'history' },
    { text: 'gap' },
    { text: '兴趣偏好', svg: 'star' },
    { text: '吐槽', svg: 'advice' },
    { text: '设置', svg: 'set' },
    { text: 'endGap' }
];

const MineStateToProps = state => ({
    userInfo: state.user
});

@connect(
    MineStateToProps
)
class Mine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mineInfo: {
                updating: 0,
                following: 0,
                follower: 0
            }
        };
    }

    itemClick = () => {
        const { userInfo, history } = this.props;
        if (!userInfo.username) {
            history.push('/login');
        }
    };

    render() {
        const { mineInfo } = this.state;
        const { userInfo } = this.props;
        const { username, userId } = userInfo;

        return (
            <div className="mine-wrapper">
                <div className="mine-title common-title">
                    <PageBar mode="light" title="我的" />
                </div>
                <div className="mine-base">
                    <Gap />
                    <List>
                        <Item
                            thumb={svg('my', 'icon-my')}
                            extra={username && baseExtra()}
                            arrow="horizontal"
                            multipleLine
                            onClick={this.itemClick}
                        >
                            {username ? (
                                <div>
                                    {username} <Brief>{`用户编号：${userId}`}</Brief>
                                </div>
                            ) : (
                                <div>
                                    尚未登录 <Brief>请登录</Brief>
                                </div>
                            )}
                        </Item>
                    </List>
                    <div className="mine-base-tab tab-wrapper">
                        {baseTabs.map((item, index) => (
                            <TabElement
                                key={index}
                                tab={{ title: mineInfo[item.key], name: item.text }}
                            />
                        ))}
                    </div>
                </div>
                <div className="mine-main">
                    <Gap />
                    <List>
                        {mainList.map((item, index) => {
                            if (item.svg) {
                                return (
                                    <Item
                                        key={index}
                                        thumb={svg(item.svg, 'icon-mine-main')}
                                        arrow="horizontal"
                                        onClick={() => {}}
                                    >
                                        {item.text}
                                    </Item>
                                );
                            } else {
                                return gap(index, item.text);
                            }
                        })}
                    </List>
                </div>
            </div>
        );
    }
}

Mine.propTypes = {
    userInfo: PropTypes.any,
    history: PropTypes.any
};

export default withRouter(Mine);
