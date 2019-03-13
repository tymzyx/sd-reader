import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PageBar } from '../../components';

import './Hots.scss';
import BookTag from "../../components/BookTag";

const mapTypes = {
    book: '图书',
    novel: '小说'
};

class Hots extends Component {
    componentWillMount() {
        const pageType = this.props.location.params || 'novel';
        this.title = `热门${mapTypes[pageType]}`;
    }

    render() {
        return (
            <div className="hots-wrapper">
                <section className="hots-title common-title">
                    <PageBar
                        mode="light"
                        title={this.title}
                        isLeft
                    />
                </section>
                <section className="hots-body">
                    {new Array(14).fill(1).map((item, index) => (
                        <div key={item + index} className="hots-book">
                            <BookTag size="large" isEllipsis={false} />
                        </div>
                    ))}
                </section>
            </div>
        );
    }
}

Hots.propTypes = {
    location: PropTypes.any
};

export default Hots;
