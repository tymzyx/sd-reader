import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '../SvgIcon/index';

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
        }, this.props.noneDelay);
    }

    render() {
        return (
            <div className="entry-wrapper entry-animation" style={{ display: this.state.isEnd ? 'none' : '' }}>
                <div className="pure-bg">
                    <div className="entry-main">
                        <SvgIcon iconClass="book" propClass="icon-book" />
                        <div style={{ marginTop: 24 }}>
                            <span>给你主宰自己的力量</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Entry.defaultProps = {
    noneDelay: 5600
};

Entry.propTypes = {
    noneDelay: PropTypes.number
};

export default Entry;
