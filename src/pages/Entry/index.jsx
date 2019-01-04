import React, { Component } from 'react';
import { SvgIcon } from '../../components';

import './entry.scss';

class Entry extends Component {
    render() {
        return (
            <div className="entry-wrapper">
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
