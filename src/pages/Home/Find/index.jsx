import React, { Component } from 'react';
import { SvgIcon, HeadBar, PageBar } from '../../../components';

import './Find.scss';
import TabElement from "../../../components/TabElement";

const headTabs = [
    { name: '书摘', svg: 'abstract', url: '' },
    { name: '广场', svg: 'talk', url: '' },
    { name: '书店', svg: 'building', url: '' }
];

class Find extends Component {
    constructor(props) {
        super(props);
        this.searchBook = this.searchBook.bind(this);
    }

    searchBook() {
        console.log(this.props);
        this.props.history.push("/search");
    }

    render() {
        return (
            <div className="find-wrapper">
                <section className="find-title common-title">
                    <PageBar mode="light" title="找书" />
                </section>
                <section className="find-head-section">
                    <div className="find-search-bar" onClick={this.searchBook}>
                        <SvgIcon iconClass="search" propClass="icon-search" />
                        <div className="search-bar-text">
                            共有360153本书
                        </div>
                    </div>
                    <div className="find-head-tab tab-wrapper">
                        {headTabs.map((item, index) => (
                            <TabElement
                                key={index}
                                tab={item}
                                isActive
                            />
                        ))}
                    </div>
                </section>
                <section className="find-main-section">
                    <div className="find-topic">
                        <HeadBar title="话题" />
                    </div>
                </section>
            </div>
        );
    }
}

export default Find;
