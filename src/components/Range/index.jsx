import React, { Component } from 'react';
import PropTypes from 'prop-types';
import draggable from './draggable';

import './Range.scss';

class Range extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: 0
        };
    }

    componentDidMount() {
        const { disabled, min, max, step } = this.props;

        const getThumbPosition = () => {
            const contentBox = this.content.getBoundingClientRect();
            const thumbBox = this.thumb.getBoundingClientRect();
            return {
                left: thumbBox.left - contentBox.left,
                top: thumbBox.top - contentBox.top,
                thumbBoxLeft: thumbBox.left
            };
        };

        let dragState = {};
        draggable(this.thumb, {
            start: (event) => {
                if (disabled) return;
                const position = getThumbPosition();
                const thumbClickDetalX = event.clientX - position.thumbBoxLeft;
                dragState = {
                    thumbStartLeft: position.left,
                    thumbStartTop: position.top,
                    thumbClickDetalX
                };
            },
            drag: (event) => {
                if (disabled) return;
                const contentBox = this.content.getBoundingClientRect();
                const deltaX = event.pageX - contentBox.left - dragState.thumbStartLeft -
                    dragState.thumbClickDetalX;
                const stepCount = Math.ceil((max - min) / step);
                const newPosition = (dragState.thumbStartLeft + deltaX) -
                    (dragState.thumbStartLeft + deltaX) % (contentBox.width / stepCount);

                let newProgress = newPosition / contentBox.width;

                if (newProgress < 0) {
                    newProgress = 0;
                } else if (newProgress > 1) {
                    newProgress = 1;
                }

                const val = Math.round(min + newProgress * (max - min));
                this.setState({
                    progress: Math.floor((val - min) / (max - min) * 100)
                });
            },
            end: () => {
                if (disabled) return;
                dragState = {};
            }
        });
    }

    render() {
        const { barHeight } = this.props;
        const { progress } = this.state;

        return (
            <div className="range-wrapper">
                <div ref={(node) => { this.content = node; }} className="range-content">
                    <div
                        className="range-runway"
                        style={{ borderTopWidth: barHeight }}
                    />
                    <div
                        className="range-progress"
                        style={{ height: barHeight, width: `${progress}%` }}
                    />
                    <div
                        ref={(node) => { this.thumb = node; }}
                        className="range-thumb"
                        style={{ left: `${progress}%` }}
                    />
                </div>
            </div>
        );
    }
}

Range.defaultProps = {
    barHeight: 1,
    disabled: false,
    min: 0,
    max: 100,
    step: 1
};

Range.propTypes = {
    barHeight: PropTypes.number,
    disabled: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number
};

export default Range;
