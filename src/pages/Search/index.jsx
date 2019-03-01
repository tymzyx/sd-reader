import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { NavBar, Icon, SearchBar } from 'antd-mobile';
import { SvgIcon } from '../../components';

import './Search.scss';

class Search extends Component {
    changeTag() {
        console.log('changetag');
    }

    clearHistory() {
        console.log('clear');
    }

    deleteHistory() {
        console.log('delete');
    }

    render() {
        return (
            <div className="search-page">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={'搜索'}
                >
                    <SearchBar placeholder="Search" cancelText={' '} />
                </NavBar>
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
            </div>
        );
    }
}

export default withRouter(Search);
