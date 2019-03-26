import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '../SvgIcon';

import './SearchBar.scss';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: ''
        };
    }

    render() {
        const { val } = this.state;
        const { placeholder, isDelete, change } = this.props;
        return (
            <div className="search-bar-wrapper">
                <input
                    type="text"
                    value={val}
                    placeholder={placeholder}
                    onChange={(e) => {
                        this.setState({ val: e.target.value });
                        change && change(e);
                    }}
                />
                <div className="search-bar-left">
                    <SvgIcon iconClass="search" propClass="icon-search" />
                </div>
                {isDelete && val ? (
                    <div className="search-bar-right">
                        <SvgIcon
                            iconClass="cross-fill"
                            propClass="icon-cross"
                            click={() => {
                                this.setState({ val: '' }, () => {
                                    change && change({
                                        target: { value: '' }
                                    });
                                });
                            }}
                        />
                    </div>
                ) : ''}
            </div>
        );
    }
}

SearchBar.defaultProps = {
    isDelete: true
};

SearchBar.propTypes = {
    placeholder: PropTypes.string,
    isDelete: PropTypes.bool,
    change: PropTypes.func
};

export default SearchBar;
