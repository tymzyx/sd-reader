import React, { Component } from 'react';
import { Button } from 'antd-mobile';

const arr = [];
for (let i = 0; i < 200; i++) {
    arr.push(i);
}

class Test extends Component {
    render() {
        return (
            <div style={{ overflow: 'auto' }}>
                {arr.map((element, i) => (
                    <Button key={i} onClick={() => { console.log('clicked', element); }}>
                        click me
                    </Button>
                ))}
            </div>
        );
    }
}

export default Test;
