import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookTag from '../BookTag';

import './BookListItem.scss';

class BookListItem extends Component {
    render() {
        const { title, number, describe } = this.props;
        return (
            <div className="book-list-item">
                <div className="list-item-head">
                    <h4>{`${title} | ${number}本`}</h4>
                    <span>{describe}</span>
                </div>
                <div className="list-item-body">
                    {new Array(number).fill(1).map((i, index) => (
                        <div key={i + index} className="list-item-book">
                            <BookTag isEllipsis={false} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

BookListItem.propTypes = {
    title: PropTypes.string,
    number: PropTypes.number,
    describe: PropTypes.string
};

export default BookListItem;
