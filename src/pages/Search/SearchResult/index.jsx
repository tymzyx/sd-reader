import React, { Component } from 'react';
import { CardItem } from '../../../components';

import './SearchResult.scss';

class SearchResult extends Component {
    render() {
        return (
            <div className="search-result-wrapper">
                <section className="search-result-head">
                    <h4>找到3622本，含有 <strong>张</strong> 的图书</h4>
                    <span>如果还没有您需要的图书，可以点击求书</span>
                </section>
                <section className="search-result-list">
                    <div className="list-title">小伙伴的藏书</div>
                    <div className="list-items">
                        {new Array(9).fill(1).map((i, index) => (
                            <CardItem
                                key={i + index}
                                title="风雨浓，胭脂乱"
                                titleAddition="尼罗式的红玫瑰白玫瑰"
                                style={{ marginBottom: 12 }}
                            />
                        ))}
                    </div>
                </section>
            </div>
        );
    }
}

export default SearchResult;
