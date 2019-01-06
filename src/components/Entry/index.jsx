import React, { Component } from 'react';
import { SvgIcon } from '../../components';

import './entry.scss';

class Entry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEnd: false
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isEnd: true
            });
        }, 5600);
    }

    render() {
        return (
            <div className="entry-wrapper entry-animation" style={{ display: this.state.isEnd ? 'none' : '' }}>
                <div className="pure-bg">
                    <div className="entry-main">
                        <SvgIcon iconClass="book" propClass="book-icon" />
                        <div style={{ marginTop: 24 }}>
                            <span>给你主宰自己的力量</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Entry;
