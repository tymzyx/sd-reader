import React, { Component } from 'react';
import { bookContent } from '../../api/request';

import './Reader.scss';

const configs = {
    middle: {
        fw: 16, fh: 26, minusW: 40, minusH: 60
    }
};

const readerBoxStyle = {
    middle: {
        padding: '20px 20px 40px',
        fontSize: 16,
        lineHeight: '26px',
        height: '100vh'
    }
};

const lineStyle = {
    middle: {
        display: 'inline-block',
        paddingLeft: 32
    }
};

class Reader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            type: 'middle'
        };
    }

    componentWillMount() {
        this.getContent();
    }

    getNum = () => {
        const { type } = this.state;
        const config = configs[type];
        const width = document.body.clientWidth - config.minusW;
        const height = document.body.clientHeight - config.minusH;
        const wordWidth = config.fw;
        const wordHeight = config.fh;
        const wordNum = Math.floor(width / wordWidth);
        const rowNum = Math.floor(height / wordHeight);
        return { wordNum, rowNum };
    };

    getContent = async () => {
        try {
            const num = this.getNum();
            const data = await bookContent({
                bookId: '1', wordNum: num.wordNum, rowNum: num.rowNum
            });
            this.setState({
                content: data.content
            });
        } catch (err) {
            console.log('error', err);
        }
    };

    touchStart = (e) => {
        this.startX = e.touches[0].pageX;
        this.startY = e.touches[0].pageY;
    };

    touchMove = (e) => {
        this.moveEndX = e.touches[0].pageX;
        this.moveEndY = e.touches[0].pageY;
        const X = this.moveEndX - this.startX;
        const Y = this.moveEndY - this.startY;

        if (
            Math.abs(X) > Math.abs(Y) && X > 0
        ) {
            console.log('touchRight');
        } else if (
            Math.abs(X) > Math.abs(Y) && X < 0
        ) {
            console.log('left');
        } else if (
            Math.abs(Y) > Math.abs(X) && Y > 0
        ) {
            console.log('top');
        } else if (
            Math.abs(Y) > Math.abs(X) && Y < 0
        ) {
            console.log('bottom');
        } else {
            console.log('just touch');
        }
    };

    render() {
        const { content } = this.state;
        const display = content[0];

        return (
            <div className="reader-wrapper" style={readerBoxStyle.middle}>
                <div
                    className="page-content"
                    onTouchStart={this.touchStart}
                    onTouchMove={this.touchMove}
                >
                    {display && display.map((line, index) => {
                        if (line === 'blank line') {
                            return (
                                <br key={index} />
                            );
                        } else {
                            return (
                                <React.Fragment key={index}>
                                    <span
                                        style={index === 0 || display[index - 1] === 'blank line' ? lineStyle.middle : {}}
                                    >
                                        {line}
                                    </span>
                                    <br />
                                </React.Fragment>
                            );
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default Reader;
