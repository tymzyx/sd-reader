import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
import { PageBar, BookTag, SvgIcon } from '../../components';
import { categoryTags } from '../../utils/variables';
import { bookCategoryList } from '../../api/request/book';

import './Categories.scss';

const tabs = categoryTags.map(item => ({ title: item.name, key: item.key }));

class Categories extends Component {
    constructor(props) {
        super(props);

        let activeTab = this.props.location.params;
        if (!activeTab && activeTab !== 0) {
            activeTab = 0;
        }

        this.state = {
            dataLists: {
                novel: [],
                literature: [],
                success: [],
                marketing: [],
                economy: [],
                computer: [],
                science: [],
                social: []
            },
            activeTabNum: activeTab
        };
    }

    componentWillMount() {
        this.fetchAll();
    }

    fetchAll = async () => {
        const promiseList = [];
        tabs.forEach((item) => {
            promiseList.push(this.fetchList(item.key, 0));
        });
        try {
            await Promise.all(promiseList);
        } catch (err) {
            console.log(err);
        }
    };

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
            {this.state.dataLists[tab.key].map((item, index) => (
                <div key={index} className="categories-book">
                    <BookTag
                        size="large"
                        isEllipsis={false}
                        title={item.title}
                        image={item.image}
                    />
                </div>
            ))}
        </div>
    );

    fetchList = async (type, startNum) => {
        try {
            const ret = await bookCategoryList({ type, startNum, limit: 18 });
            const { dataLists } = this.state;
            dataLists[type] = ret.list;
            this.setState({
                dataLists: { ...dataLists }
            });
        } catch (err) {
            console.log('error', err);
        }
    };

    render() {
        const { activeTabNum } = this.state;
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
                        renderTabBar={props => (
                            this.renderTabBar({ ...props, activeTab: activeTabNum })
                        )}
                        onChange={(tab) => { this.setState({ activeTabNum: tabs.indexOf(tab) }); }}
                    >
                        {this.renderContent}
                    </Tabs>
                </section>
            </div>
        );
    }
}

export default Categories;
