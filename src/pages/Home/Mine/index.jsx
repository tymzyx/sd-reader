import React, { Component } from 'react';
import { NavBar, List } from 'antd-mobile';
import { SvgIcon } from '../../../components';
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

    render() {
        const { mineInfo } = this.state;

        return (
            <div className="mine-wrapper">
                <div className="mine-title">
                    <NavBar mode="light" >
                        我的
                    </NavBar>
                </div>
                <div className="mine-base">
                    <List>
                        <Item
                            thumb={svg('my', 'icon-my')}
                            extra={baseExtra()}
                            arrow="horizontal"
                            multipleLine
                            onClick={() => {}}
                        >
                            Name <Brief>用户编号：001</Brief>
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

export default Mine;
