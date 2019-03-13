import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
import PageBar from '../../components/PageBar';
import BookTag from '../../components/BookTag';
import { categoryTags } from '../../utils/variables';

import './Categories.scss';

const tabs = categoryTags.map(item => ({ title: item.name }));

class Categories extends Component {
    renderTabBar = props => (
        <div className="categories-tab-header">
            <Tabs.DefaultTabBar
                {...props}
                page={5}
            />
        </div>
    );

    renderContent = tab => (
        <div
            className="categories-tab-content"
            style={{
                marginTop: 43.5
            }}
        >
            {new Array(14).fill(1).map((item, index) => (
                <div key={tab.key + item + index} className="categories-book">
                    <BookTag size="large" isEllipsis={false} />
                </div>
            ))}
        </div>
    );

    render() {
        return (
            <div className="categories-wrapper">
                <section className="categories-title common-title">
                    <PageBar mode="light" title="图书分类" isLeft />
                </section>
                <section className="categories-body">
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

export default Categories;
