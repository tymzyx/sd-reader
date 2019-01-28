import React, { Component } from 'react';
import classNames from 'classnames';
import { bookContent } from '../../api/request';
import { PageBar, TabElement } from '../../components';

import './Reader.scss';

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

const tabs = [
    { svg: 'catalog', url: '/home/collection' },
    { svg: 'progress', url: '/home/find' },
    { svg: 'sun', url: '/home/vip' },
    { svg: 'A', url: '/home/mine' }
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
            totalPage: '',
            type: 'middle',
            activePage: 1,
            isConfig: false
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
            data.content.forEach(item => {
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
            if (Math.abs(X) > 100) {
                this.rightPaging = true;
            } else {
                this.rightPaging = false;
            }
        } else if (
            Math.abs(X) > Math.abs(Y) && X < 0 && !isLast
        ) {
            // left
            e.currentTarget.style.transform = `translateX(-${Math.abs(X)}px)`;
            this.onLeft = true;
            if (Math.abs(X) > 100) {
                this.leftPaging = true;
            } else {
                this.leftPaging = false;
            }
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
                    activePage: this.state.activePage + 1
                }, () => {
                    const { activePage, contents } = this.state;
                    if (activePage > this.cacheContents[9].page) {
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
                    activePage: this.state.activePage - 1
                }, () => {
                    this.pages[pageIndex - 1].style.transform = 'none';
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
        this.setState({
            isConfig: !this.state.isConfig
        });
    };

    render() {
        const { contents, isConfig, totalPage, activePage } = this.state;
        const displays = contents;

        return (
            <div className="reader-wrapper">
                <section
                    className={classNames([
                        'common-title',
                        'page-animation',
                        {
                            'config-top-hide': !isConfig
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
                            'config-bottom-hide': !isConfig
                        }
                    ])}
                >
                    {tabs.map((item, index) => (
                        <TabElement
                            key={index}
                            tab={item}
                        />
                    ))}
                </section>
            </div>
        );
    }
}

export default Reader;
