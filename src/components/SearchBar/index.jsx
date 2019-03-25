import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '../SvgIcon';

import './SearchBar.scss';

class SearchBar extends Component {
    render() {
        const { placeholder, isDelete } = this.props;
        return (
            <div className="search-bar-wrapper">
                <input type="text" placeholder={placeholder} />
                <div className="search-bar-left">
                    <SvgIcon iconClass="search" propClass="icon-search" />
                </div>
                {isDelete ? (
                    <div className="search-bar-right">
                        <SvgIcon iconClass="cross-fill" propClass="icon-cross" />
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
    isDelete: PropTypes.bool
};

export default SearchBar;
