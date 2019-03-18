import React, { Component } from 'react';
import { PageBar } from '../../components';

import './BookAnalysis.scss';
import CardItem from "../../components/CardItem";

class BookAnalysis extends Component {
    render() {
        return (
            <div className="book-analysis-wrapper">
                <section className="book-analysis-title common-title">
                    <PageBar title="好书解读" mode="light" isLeft />
                </section>
                <section className="book-analysis-body">
                    {new Array(8).fill(1).map((num, index) => (
                        <CardItem
                            key={num + index}
                            title="风雨浓，胭脂乱"
                            titleAddition="尼罗式的红玫瑰白玫瑰尼罗式的红玫瑰白玫瑰尼罗式的红玫瑰白"
                            style={{ marginTop: 12 }}
                            extra={<span className="item-extra">自我管理</span>}
                        />
                    ))}
                </section>
            </div>
        );
    }
}

export default BookAnalysis;
