import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PageBar, SvgIcon, SearchBar } from '../../components';
import SearchResult from './SearchResult';
import _ from 'lodash';
import { keywords, bookSearch } from '../../api/request';

import './Search.scss';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showResult: false,
            showItems: false,
            hasVal: false,
            searchResults: [],
            keywordResults: []
        };
    }

    searchChange = _.debounce(async (val) => {
        // console.log('val:', val);
        try {
            if (val) {
                const res = await keywords({ keyword: val });
                this.setState({
                    showResult: false,
                    showItems: true,
                    hasVal: true,
                    keywordResults: res.items
                });
            } else {
                this.setState({
                    showResult: false,
                    showItems: false,
                    hasVal: false
                });
            }
        } catch (err) {
            console.log('error', err);
        }
    }, 200);

    searchBtn = () => {
        const { hasVal } = this.state;
        return (
            <span
                style={{ color: hasVal ? '#333' : '#aaa' }}
                onClick={() => { this.clickSearch(); }}
            >
                搜索
            </span>
        );
    };

    clickSearch = async (val) => {
        try {
            const keyword = val || this.inputNode.state.val;
            const res = await bookSearch({ keyword });
            console.log(res);
            this.setState({
                showResult: true,
                showItems: false,
                searchResults: res.results
            });
        } catch (err) {
            console.log('error', err);
        }
    };

    changeTag = () => {
        console.log('changetag');
    };

    clearHistory = () => {
        console.log('clear');
    };

    deleteHistory = () => {
        console.log('delete');
    };

    render() {
        const { showResult, showItems, keywordResults, searchResults } = this.state;

        return (
            <div className="search-page">
                <section className="search-page-title common-title">
                    <PageBar
                        mode="light"
                        isLeft
                        right={this.searchBtn()}
                    >
                        <SearchBar
                            ref={(node) => { this.inputNode = node; }}
                            placeholder="请输入搜索条件"
                            change={(e) => {
                                this.searchChange(e.target.value);
                            }}
                        />
                    </PageBar>
                </section>
                <section className="search-page-body">
                    {showResult ? (
                        <SearchResult
                            dataSource={searchResults}
                        />
                    ) : (
                        <>
                            {!showItems ? (
                                <div className={'search-content'}>
                                    <div className={'tags'}>
                                        <div className={'tag-title'}>
                                            <h5><SvgIcon iconClass={'search'} /> 大家都在搜</h5>
                                            <p className={'change-tag'} onClick={this.changeTag}>换一换</p>
                                        </div>
                                        <div className={'tag-container'}>
                                            <div className={'tag margin-right'} >流浪地球</div>
                                            <div className={'tag margin-right'}>刘慈欣</div>
                                            <div className={'tag'}>and</div>
                                        </div>
                                    </div>
                                    <div>
                                        <h5><SvgIcon iconClass={'fire'} /> 借阅热榜</h5>
                                        <div className={'des'}>
                                            <div className={'detail'}>
                                                <img src={require('@/assets/image/Micro_habits.jpg')} alt="" />
                                                <p className={'book-title'}>人间失格</p>
                                            </div>
                                            <div className={'detail'}>
                                                <img src={require('@/assets/image/Micro_habits.jpg')} alt="" />
                                                <p className={'book-title'}>人间失格</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={'tag-title'}>
                                            <h5><SvgIcon iconClass={'time'} /> 历史搜索</h5>
                                            <h5 className={'change-tag'} onClick={this.clearHistory}>清空</h5>
                                        </div>
                                        <div className={'tag-title'}>
                                            <p className={'search-history'}>走到人生边上</p>
                                            <p><SvgIcon iconClass={'delete'} propClass={'delete-color'} click={this.deleteHistory} /></p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="search-val-items">
                                    {keywordResults.map((item, index) => (
                                        <div
                                            key={index}
                                            className="search-val-item"
                                            onClick={() => { this.clickSearch(item); }}
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </section>
            </div>
        );
    }
}

export default withRouter(Search);
