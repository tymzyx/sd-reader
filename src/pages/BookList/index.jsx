import React, { Component } from 'react';
import { PageBar, BookListItem } from '../../components';

import './BookList.scss';

class BookList extends Component {
    render() {
        return (
            <div className="book-list-wrapper">
                <section className="book-list-title common-title">
                    <PageBar mode="light" title="书单" isLeft />
                </section>
                <section className="book-list-body">
                    {new Array(9).fill(1).map((num, index) => (
                        <div className="book-item" key={index + num}>
                            <BookListItem
                                title="一座城市，一本书"
                                number={7}
                                describe="如果让你为自己喜欢的城市写一本书，你会怎么形容你心中的那座城市？"
                            />
                        </div>
                    ))}
                </section>
            </div>
        );
    }
}

export default BookList;
