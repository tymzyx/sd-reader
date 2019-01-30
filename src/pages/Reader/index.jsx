import React, { Component } from 'react';
import classNames from 'classnames';
import { Tabs, Toast } from 'antd-mobile';
import { bookContent } from '../../api/request';
import { PageBar, TabElement, NoData, Range } from '../../components';

import './Reader.scss';
import SvgIcon from "../../components/SvgIcon";

const configs = {
    middle: {
        fw: 16, fh: 26, minusW: 40, minusH: 60
    }
};

const pageBoxStyle = {
    middle: {
        padding: '20px 20px 40px',
        fontSize: 16,
        lineHeight: '26px'
    }
};

const lineStyle = {
    middle: {
        display: 'inline-block',
        paddingLeft: 32
    }
};

const CATALOG = Symbol();
const PROGRESS = Symbol();
const BRIGHT = Symbol();
const SET = Symbol();
const footerTabs = [
    { name: '目录', svg: 'catalog', type: CATALOG },
    { name: '进度', svg: 'progress', type: PROGRESS },
    { name: '亮度', svg: 'sun', type: BRIGHT },
    { name: '设置', svg: 'A', type: SET }
];

const helperTabs = [
    { title: '目录' },
    { title: '书签' },
    { title: '笔记' }
];

class Reader extends Component {
    constructor(props) {
        super(props);
        this.leftPaging = false;
        this.rightPaging = false;
        this.onLeft = false;
        this.onRight = false;
        this.pages = [];
        this.numConfig = {};
        this.cacheContents = [];

        this.state = {
            contents: [],
            totalPage: 0,
            catalog: '',
            notes: '',
            type: 'middle',
            activePage: 1,
            displayActivePage: 1,
            isConfig: false,
            isLeftHelper: false,
            isProgress: false,
            loading: false
        };
    }

    componentWillMount() {
        this.getConfig();
        this.getContent();
    }

    getConfig = () => {
        const { type } = this.state;
        const config = configs[type];
        const width = document.body.clientWidth - config.minusW;
        const height = document.body.clientHeight - config.minusH;
        const wordWidth = config.fw;
        const wordHeight = config.fh;
        const wordNum = Math.floor(width / wordWidth);
        const rowNum = Math.floor(height / wordHeight);
        this.numConfig = { wordNum, rowNum };
    };

    getContent = async (pageNum) => {
        try {
            const params = {
                bookId: '1',
                wordNum: this.numConfig.wordNum,
                rowNum: this.numConfig.rowNum,
                pageNum
            };
            const data = await bookContent(params);
            const contents = [];
            data.content.forEach((item) => {
                contents[item.page - 1] = item;
            });
            this.cacheContents = data.content;
            this.setState({
                contents,
                totalPage: data.totalPage
            });
        } catch (err) {
            console.log('error', err);
        }
    };

    touchStart = (pageIndex, e) => {
        this.startX = e.touches[0].pageX;
        this.startY = e.touches[0].pageY;
        e.currentTarget.classList.remove('page-animation');
        pageIndex && this.pages[pageIndex - 1].classList.remove('page-animation');
    };

    touchMove = (isFirst, isLast, pageIndex, e) => {
        this.moveEndX = e.touches[0].pageX;
        this.moveEndY = e.touches[0].pageY;
        const X = this.moveEndX - this.startX;
        const Y = this.moveEndY - this.startY;

        if (
            Math.abs(X) > Math.abs(Y) && X > 0 && !isFirst
        ) {
            // right
            this.pages[pageIndex - 1].style.transform = `translateX(-${document.body.clientWidth - Math.abs(X)}px)`;
            this.onRight = true;
            this.rightPaging = Math.abs(X) > 100;
        } else if (
            Math.abs(X) > Math.abs(Y) && X < 0 && !isLast
        ) {
            // left
            e.currentTarget.style.transform = `translateX(-${Math.abs(X)}px)`;
            this.onLeft = true;
            this.leftPaging = Math.abs(X) > 100;
        } else if (
            Math.abs(Y) > Math.abs(X) && Y > 0
        ) {
            console.log('top');
        } else if (
            Math.abs(Y) > Math.abs(X) && Y < 0
        ) {
            console.log('bottom');
        }
    };

    touchEnd = (isLast, pageIndex, e) => {
        if (this.onLeft) {
            e.currentTarget.classList.add('page-animation');
            if (this.leftPaging) {
                e.currentTarget.style.transform = '';
                this.setState({
                    activePage: this.state.activePage + 1,
                    displayActivePage: this.state.activePage + 1
                }, () => {
                    const { activePage, totalPage } = this.state;
                    if (activePage > this.cacheContents[9].page && activePage < totalPage - 10) {
                        this.getContent(activePage);
                    }
                });
                this.leftPaging = false;
            } else {
                e.currentTarget.style.transform = 'none';
            }
        }
        if (this.onRight) {
            this.pages[pageIndex - 1].classList.add('page-animation');
            if (this.rightPaging) {
                this.setState({
                    activePage: this.state.activePage - 1,
                    displayActivePage: this.state.activePage - 1
                }, () => {
                    this.pages[pageIndex - 1].style.transform = 'none';
                    const { activePage, totalPage } = this.state;
                    if (activePage > 9 && activePage < totalPage - 10) {
                        this.getContent(activePage);
                    }
                });
                this.rightPaging = false;
            } else {
                this.pages[pageIndex - 1].style.transform = 'translateX(-100%)';
            }
        }
        this.onRight = false;
        this.onLeft = false;
    };

    switchConfig = () => {
        const { isLeftHelper } = this.state;
        if (isLeftHelper) {
            this.setState({
                isLeftHelper: false
            });
        } else {
            this.setState({
                isConfig: !this.state.isConfig,
                isProgress: false
            });
        }
    };

    clickConfig = (tab) => {
        switch (tab.type) {
            case CATALOG:
                this.setState({
                    isConfig: false,
                    isProgress: false,
                    isLeftHelper: true
                });
                break;
            case PROGRESS:
                this.setState({
                    isProgress: true
                });
        }
    };

    changePage = (val) => {
        if (val !== this.state.activePage) {
            Toast.loading('loading...', 0);
            this.setState({
                loading: true
            }, async () => {
                await this.getContent(val);
                this.setState({
                    activePage: val
                }, () => {
                    setTimeout(() => {
                        Toast.hide();
                        this.setState({
                            loading: false
                        });
                    }, 500);
                });
            });
        }
    };

    render() {
        const {
            contents,
            isConfig,
            totalPage,
            activePage,
            isLeftHelper,
            catalog,
            notes,
            isProgress,
            displayActivePage,
            loading
        } = this.state;
        const displays = contents;

        return (
            <div className="reader-wrapper">
                <section
                    className={classNames([
                        'common-title',
                        'page-animation',
                        {
                            'config-header-hide': !isConfig
                        }
                    ])}
                >
                    <PageBar
                        mode="light"
                        isLeft
                        isOpacity
                    />
                </section>
                {displays.map((display, i) => (
                    display &&
                    <div
                        ref={(node) => { this.pages[i] = node; }}
                        className={classNames([
                            'page-content',
                            'page-animation',
                            {
                                'page-out': display.page < activePage
                            }
                        ])}
                        style={{ ...pageBoxStyle.middle, zIndex: `${100 - i}` }}
                        onTouchStart={(e) => { this.touchStart(i, e); }}
                        onTouchMove={(e) => {
                            this.touchMove(i === 0, i === displays.length - 1, i, e);
                        }}
                        onTouchEnd={(e) => { this.touchEnd(i === displays.length - 1, i, e); }}
                        onClick={this.switchConfig}
                        key={i}
                    >
                        {display && display.content.map((line, index) => {
                            if (line === 'blank line') {
                                return (
                                    <br key={index} />
                                );
                            } else {
                                return (
                                    <React.Fragment key={index}>
                                        <span
                                            style={line.first ? lineStyle.middle : {}}
                                        >
                                            {line.line}
                                        </span>
                                        <br />
                                    </React.Fragment>
                                );
                            }
                        })}
                        <div className="page-footer">
                            {`${display && display.page} / ${totalPage}`}
                        </div>
                    </div>
                ))}
                <section
                    className={classNames([
                        'reader-config-footer',
                        'page-animation',
                        {
                            'config-footer-hide': !isConfig
                        }
                    ])}
                >
                    {footerTabs.map((item, index) => (
                        <TabElement
                            key={index}
                            tab={item}
                            click={this.clickConfig}
                            gap={4}
                        />
                    ))}
                </section>
                <section
                    className={classNames([
                        'reader-helper-left',
                        'page-animation',
                        {
                            'helper-left-hide': !isLeftHelper
                        }
                    ])}
                >
                    <Tabs
                        tabs={helperTabs}
                        tabBarUnderlineStyle={{ border: '1px solid #222' }}
                        tabBarInactiveTextColor="#aaa"
                        tabBarActiveTextColor="#222"
                    >
                        <div className="helper-tab">
                            {catalog ? (
                                <span />
                            ) : (
                                <NoData />
                            )}
                        </div>
                        <div className="helper-tab">
                            {window.localStorage.getItem('bookMarker') ? (
                                <span />
                            ) : (
                                <NoData />
                            )}
                        </div>
                        <div className="helper-tab">
                            {notes ? (
                                <span />
                            ) : (
                                <NoData />
                            )}
                        </div>
                    </Tabs>
                </section>
                {totalPage ? (
                    <section
                        className={classNames([
                            'reader-helper-progress',
                            {
                                'helper-progress-hide': !isProgress
                            }
                        ])}
                    >
                        <div className="helper-progress-index">
                            {`${displayActivePage} / ${totalPage}`}
                        </div>
                        <SvgIcon iconClass="arrow" propClass="icon-arrow-left" />
                        <Range
                            onDrag={(val) => { this.setState({ displayActivePage: val }); }}
                            endDrag={this.changePage}
                            max={totalPage}
                            min={1}
                        />
                        <SvgIcon iconClass="arrow" propClass="icon-arrow-right" />
                    </section>
                ) : ''}
                <section className="reader-loading" style={{ display: loading ? 'block' : 'none' }} />
            </div>
        );
    }
}

export default Reader;
