import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CardItem } from '../../../components';

import './SearchResult.scss';

class SearchResult extends Component {
    render() {
        const { dataSource } = this.props;
        return (
            <div className="search-result-wrapper">
                <section className="search-result-head">
                    <h4>找到{dataSource.length}本，含有搜索关键字的图书</h4>
                    <span>如果还没有您需要的图书，可以点击求书</span>
                </section>
                {dataSource.length ? (
                    <section className="search-result-list">
                        <div className="list-title">小伙伴的藏书</div>
                        <div className="list-items">
                            {dataSource.map((item, index) => (
                                <CardItem
                                    key={index}
                                    title={item.title}
                                    titleAddition={item.brief}
                                    style={{ marginBottom: 12 }}
                                />
                            ))}
                        </div>
                    </section>
                ) : (
                    <section className="search-no-result">
                        <div className="no-result-wish">求书</div>
                    </section>
                )}
            </div>
        );
    }
}

SearchResult.propTypes = {
    dataSource: PropTypes.array
};

export default SearchResult;
