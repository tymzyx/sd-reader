import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
import { PageBar, CardItem } from '../../components';
import { rankList } from '../../utils/variables';

import './Ranks.scss';

const tabs = rankList.map(item => ({ title: item.name, key: item.key }));

class Ranks extends Component {
    renderTabBar = props => (
        <div className="ranks-tab-header">
            <Tabs.DefaultTabBar
                {...props}
                page={4}
            />
        </div>
    );

    renderContent = tab => (
        <div
            className="ranks-tab-content"
            style={{
                marginTop: 43.5
            }}
        >
            {new Array(10).fill(1).map((item, index) => (
                <div key={tab.key + item + index} className="ranks-book">
                    <CardItem
                        title={`${index < 3 ? `top${index + 1} ` : ''}风雨浓，胭脂乱`}
                        titleAddition="尼罗式的红玫瑰白玫瑰尼罗式的红玫瑰白玫瑰尼罗式的红玫瑰白玫瑰尼罗式的红玫瑰白玫瑰尼罗式的红玫瑰白玫瑰"
                        style={{ marginBottom: 12 }}
                    />
                </div>
            ))}
        </div>
    );

    render() {
        return (
            <div className="ranks-wrapper">
                <section className="ranks-title common-title">
                    <PageBar
                        mode="light"
                        title="榜单"
                        isLeft
                    />
                </section>
                <section className="ranks-body">
                    <Tabs
                        tabs={tabs}
                        tabBarUnderlineStyle={{
                            border: '1px solid #333'
                        }}
                        tabBarActiveTextColor="#333"
                        tabBarInactiveTextColor="#aaa"
                        renderTabBar={this.renderTabBar}
                    >
                        {this.renderContent}
                    </Tabs>
                </section>
            </div>
        );
    }
}

export default Ranks;
