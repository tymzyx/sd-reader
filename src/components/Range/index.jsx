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

    componentWillMount() {
        const { currentVal, min, max } = this.props;
        this.setState({
            progress: Math.floor((currentVal - min) / (max - min) * 100)
        });
    }

    componentDidMount() {
        const { disabled, min, max, step, onDrag, endDrag, currentVal } = this.props;

        const getThumbPosition = () => {
            const contentBox = this.content.getBoundingClientRect();
            const thumbBox = this.thumb.getBoundingClientRect();
            return {
                left: thumbBox.left - contentBox.left,
                top: thumbBox.top - contentBox.top,
                thumbBoxLeft: thumbBox.left
            };
        };

        this.val = currentVal;
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

                this.val = Math.round(min + newProgress * (max - min));
                this.setState({
                    progress: Math.floor((this.val - min) / (max - min) * 100)
                });
                onDrag && onDrag(this.val);
            },
            end: () => {
                if (disabled) return;
                dragState = {};
                endDrag && endDrag(this.val);
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.val !== nextProps.currentVal) {
            const { min, max } = this.props;
            this.val = nextProps.currentVal;
            this.setState({
                progress: Math.floor((this.val - min) / (max - min) * 100)
            });
        }
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
    step: 1,
    currentVal: 0
};

Range.propTypes = {
    barHeight: PropTypes.number,
    disabled: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onDrag: PropTypes.func,
    endDrag: PropTypes.func,
    currentVal: PropTypes.number
};

export default Range;
