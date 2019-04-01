import React, { Component } from 'react';
import classNames from 'classnames';
import { Tabs, Toast } from 'antd-mobile';
import { CSSTransition } from 'react-transition-group';
import { bookContent } from '../../api/request';
import { PageBar, TabElement, NoData, Range } from '../../components';
import AddComment from './AddComment';

import './Reader.scss';
import SvgIcon from "../../components/SvgIcon";

const configs = {
    small: {
        fw: 12, fh: 18, minusW: 40, minusH: 60
    },
    middle: {
        fw: 16, fh: 26, minusW: 40, minusH: 60
    },
    large: {
        fw: 20, fh: 32, minusW: 40, minusH: 60
    }
};

const pageBoxStyle = {
    small: {
        padding: '20px 20px 40px',
        fontSize: 12,
        lineHeight: '18px'
    },
    middle: {
        padding: '20px 20px 40px',
        fontSize: 16,
        lineHeight: '26px'
    },
    large: {
        padding: '20px 20px 40px',
        fontSize: 20,
        lineHeight: '32px'
    },
    bgDefault: {
        backgroundColor: '#FFF8DC',
        color: '#000'
    },
    bgGreen: {
        backgroundColor: '#C1FFC1',
        color: '#000'
    },
    bgNight: {
        backgroundColor: '#222',
        color: '#ddd'
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
        this.wordType = 'middle';

        this.state = {
            contents: [],
            totalPage: 0,
            catalog: '',
            notes: '',
            activePage: 1,
            displayActivePage: 1,
            isConfig: false,
            isLeftHelper: false,
            isProgress: false,
            isWord: false,
            loading: false,
            bgType: 'bgDefault',
            brightVal: 100,
            isBright: false,
            isAddComment: false
        };
    }

    componentWillMount() {
        this.getConfig();
        this.getContent();
    }

    getConfig = () => {
        ['small', 'middle', 'large'].forEach((type) => {
            const config = configs[type];
            const width = document.body.clientWidth - config.minusW;
            const height = document.body.clientHeight - config.minusH;
            const wordWidth = config.fw;
            const wordHeight = config.fh;
            const wordNum = Math.floor(width / wordWidth);
            const rowNum = Math.floor(height / wordHeight);
            this.numConfig[type] = { wordNum, rowNum, pageCount: wordNum * rowNum };
        });
    };

    getContent = async (pageNum) => {
        try {
            const params = {
                bookId: 'c4ec5791-506a-11e9-8465-38c9861033db',
                wordNum: this.numConfig[this.wordType].wordNum,
                rowNum: this.numConfig[this.wordType].rowNum,
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
                isProgress: false,
                isWord: false,
                isBright: false
            });
        }
    };

    clickConfig = (tab) => {
        switch (tab.type) {
            case CATALOG:
                this.setState({
                    isConfig: false,
                    isProgress: false,
                    isWord: false,
                    isBright: false,
                    isLeftHelper: true
                });
                break;
            case PROGRESS:
                this.setState({
                    isProgress: true,
                    isWord: false,
                    isBright: false
                });
                break;
            case SET:
                this.setState({
                    isWord: true,
                    isProgress: false,
                    isBright: false
                });
                break;
            case BRIGHT:
                this.setState({
                    isBright: true,
                    isWord: false,
                    isProgress: false
                });
                break;
        }
    };

    changePage = (val, num) => {
        if (num) {
            const { totalPage } = this.state;
            val += num;
            val = val > totalPage ? totalPage : (val < 1 ? 1 : val);
            this.setState({
                displayActivePage: val
            });
        }
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

    changeWordStyle = (type) => {
        if (this.wordType !== type) {
            Toast.loading('loading...', 0);
            this.setState({
                loading: true
            }, async () => {
                let page = this.pageNumTransfer(this.wordType, type);
                page = page < 1 ? 1 : page;
                this.wordType = type;
                await this.getContent(page);
                page = page > this.state.totalPage ? this.state.totalPage : page;
                this.setState({
                    activePage: page,
                    displayActivePage: page
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

    pageNumTransfer = (from, to) => {
        const { activePage } = this.state;
        return Math.round(this.numConfig[from].pageCount * activePage /
            this.numConfig[to].pageCount);
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
            loading,
            bgType,
            isWord,
            brightVal,
            isBright,
            isAddComment
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
                    />
                </section>
                {displays.map((display, i) => (
                    display &&
                    <div
                        className={classNames([
                            'page-content',
                            'page-animation',
                            {
                                'page-out': display.page < activePage
                            }
                        ])}
                        ref={(node) => { this.pages[i] = node; }}
                        style={{ ...pageBoxStyle[this.wordType], ...pageBoxStyle[bgType], zIndex: `${totalPage + 1 - i}` }}
                        onTouchStart={(e) => { this.touchStart(i, e); }}
                        onTouchMove={(e) => {
                            this.touchMove(i === 0, i === displays.length - 1, i, e);
                        }}
                        onTouchEnd={(e) => { this.touchEnd(i === displays.length - 1, i, e); }}
                        onClick={this.switchConfig}
                        key={i}
                    >
                        <div
                            className="page-mask"
                            style={{ opacity: `${0.5 - brightVal / 100 * 0.5}` }}
                        />
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
                        <SvgIcon
                            iconClass="arrow"
                            propClass="icon-arrow-left"
                            click={() => {
                                this.changePage(displayActivePage, -10);
                            }}
                        />
                        <Range
                            onDrag={(val) => { this.setState({ displayActivePage: val }); }}
                            endDrag={this.changePage}
                            max={totalPage}
                            min={1}
                            currentVal={displayActivePage}
                        />
                        <SvgIcon
                            iconClass="arrow"
                            propClass="icon-arrow-right"
                            click={() => {
                                this.changePage(displayActivePage, 10);
                            }}
                        />
                    </section>
                ) : ''}
                <section className="reader-helper-bright" style={{ display: isBright ? '' : 'none' }}>
                    <Range
                        currentVal={brightVal}
                        onDrag={(val) => { this.setState({ brightVal: val }); }}
                    />
                    <div style={{ marginLeft: 14 }}>
                        <TabElement tab={{ svg: 'moon', name: '夜间' }} />
                    </div>
                </section>
                <section className="reader-helper-word" style={{ display: isWord ? 'block' : 'none' }}>
                    <div className="helper-word-item">
                        <span className="helper-word-title">字号</span>
                        <div className="word-item-main">
                            <span
                                style={{ fontSize: pageBoxStyle.small.fontSize }}
                                onClick={() => { this.changeWordStyle('small'); }}
                            >
                                小
                            </span>
                            <span
                                style={{ fontSize: pageBoxStyle.middle.fontSize }}
                                onClick={() => { this.changeWordStyle('middle'); }}
                            >
                                中
                            </span>
                            <span
                                style={{ fontSize: pageBoxStyle.large.fontSize }}
                                onClick={() => { this.changeWordStyle('large'); }}
                            >
                                大
                            </span>
                        </div>
                    </div>
                    <div className="helper-word-item">
                        <span className="helper-word-title">背景</span>
                        <div className="word-item-main">
                            <span
                                className="bg-option"
                                style={{ ...pageBoxStyle.bgDefault }}
                                onClick={() => { this.setState({ bgType: 'bgDefault' }); }}
                            />
                            <span
                                className="bg-option"
                                style={{ ...pageBoxStyle.bgGreen }}
                                onClick={() => { this.setState({ bgType: 'bgGreen' }); }}
                            />
                            <span
                                className="bg-option"
                                style={{ ...pageBoxStyle.bgNight }}
                                onClick={() => { this.setState({ bgType: 'bgNight' }); }}
                            />
                        </div>
                    </div>
                </section>
                <section
                    className="reader-add-comment"
                    onClick={() => { this.setState({ isAddComment: true }); }}
                >
                    <SvgIcon iconClass="write" propClass="icon-write" />
                </section>
                <CSSTransition
                    in={isAddComment}
                    classNames="addComment"
                    unmountOnExit
                    timeout={300}
                >
                    <AddComment cancel={() => { this.setState({ isAddComment: false }); }} />
                </CSSTransition>
                <section className="reader-loading" style={{ display: loading ? 'block' : 'none' }} />
            </div>
        );
    }
}

export default Reader;
