import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './BookTag.scss';

const mockImg = require("../../assets/image/book-cover.jpg");

class BookTag extends Component {
    render() {
        const { title, image, size, isEllipsis } = this.props;

        return (
            <div className={`book-tag-wrapper wrapper-width-${size}`}>
                <img src={image || mockImg} className={`book-tag-img book-tag-${size}`} alt="" />
                {
                    title &&
                    <span
                        className={`book-title ${isEllipsis ? 'title-ellipsis' : ''}`}
                    >
                        {title}
                    </span>
                }
            </div>
        );
    }
}

BookTag.defaultProps = {
    title: '假如岁月足够长足够长',
    size: 'middle',
    isEllipsis: true
};

BookTag.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    size: PropTypes.string,
    isEllipsis: PropTypes.bool
};

export default BookTag;
