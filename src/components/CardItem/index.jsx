import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookTag from '../BookTag';

import './CardItem.scss';

class CardItem extends Component {
    render() {
        const { image, extra, title, titleAddition, style } = this.props;
        return (
            <div className="card-item-wrapper" style={{ ...style }}>
                <div className="card-left">
                    <BookTag image={image} title="" />
                </div>
                <div className="card-right">
                    <div className="card-right-content">
                        <span className="card-title">{title}</span>
                        <span className="card-title-add">{titleAddition}</span>
                    </div>
                    {extra}
                </div>
            </div>
        );
    }
}

CardItem.propTypes = {
    image: PropTypes.string,
    extra: PropTypes.node,
    title: PropTypes.node,
    titleAddition: PropTypes.string,
    style: PropTypes.object
};

export default CardItem;
