import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './BookTag.scss';

const mockImg = require("../../assets/image/book-cover.jpg");

class BookTag extends Component {
    render() {
        const { title, image } = this.props;

        return (
            <div className="book-tag-wrapper">
                <img src={image || mockImg} className="book-tag-img" alt="" />
                {title && <span>{title}</span>}
            </div>
        );
    }
}

BookTag.defaultProps = {
    title: '假如岁月足够长足够长'
};

BookTag.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string
};

export default BookTag;
