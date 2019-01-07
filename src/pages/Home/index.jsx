import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Mine from './Mine/index';
import BottomTab from '../../components/BottomTab/index';
import './home.scss';

const bottomTabs = [
    { name: '藏书', svg: 'books' },
    { name: '找书', svg: 'file-search' },
    { name: 'VIP', svg: 'vip' },
    { name: '我的', svg: 'my_fill' }
];

class Home extends Component {
    render() {
        return (
            <div className="home-wrapper">
                <Switch>
                    <Route exact path="/home/mine" component={Mine} />
                </Switch>
                <BottomTab tabs={bottomTabs} />
            </div>
        );
    }
}

export default Home;
