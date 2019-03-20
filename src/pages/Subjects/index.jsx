import React, { Component } from 'react';
import { PageBar } from '../../components';

import './Subjects.scss';

const subjectImg = require('../../assets/image/subject.jpg');

class Subjects extends Component {
    render() {
        return (
            <div className="subjects-wrapper">
                <section className="subjects-title common-title">
                    <PageBar mode="light" title="专题" isLeft />
                </section>
                <section className="subjects-body">
                    {new Array(7).fill(1).map((num, index) => (
                        <div className="subjects-item" key={num + index}>
                            <img src={subjectImg} alt="" />
                        </div>
                    ))}
                </section>
            </div>
        );
    }
}

export default Subjects;
