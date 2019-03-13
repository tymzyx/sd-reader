import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
import { PageBar, BookTag, SvgIcon } from '../../components';
import { categoryTags } from '../../utils/variables';

import './Categories.scss';

const tabs = categoryTags.map(item => ({ title: item.name, key: item.key }));

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
                    <PageBar
                        mode="light"
                        title="图书分类"
                        isLeft
                        right={(
                            <SvgIcon
                                iconClass="search"
                                propClass="icon-search"
                                click={() => { console.log('to->search page'); }}
                            />
                        )}
                    />
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
