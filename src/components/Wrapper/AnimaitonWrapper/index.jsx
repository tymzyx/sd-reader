import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import './AnimationWrapper.scss';

export const AnimationWrapper = WrappedComponent => class WrapperComponent extends Component {
    render() {
        return (
            <CSSTransition
                classNames="fade"
                timeout={1000}
                mountOnEnter
                unmountOnExit
            >
                <WrappedComponent {...this.props} {...this.state} />
            </CSSTransition>
        );
    }
};
