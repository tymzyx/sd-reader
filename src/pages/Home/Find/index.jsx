import React, { Component } from 'react';
import { NavBar } from 'antd-mobile';

import './Find.scss';

class Find extends Component {
    render() {
        return (
            <div className="find-wrapper">
                <section className="find-title">
                    <NavBar mode="light" >
                        找书
                    </NavBar>
                </section>
                <section className="find-head-section">
                    123
                </section>
            </div>
        );
    }
}

export default Find;
