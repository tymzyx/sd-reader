import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Mine from './Mine/index';
import Find from './Find/index';
import Collection from './Collection/index';
import Vip from './VIP/index';
import BottomTab from '../../components/BottomTab/index';
import './home.scss';

const bottomTabs = [
    { name: '藏书', svg: 'books', url: '/home/collection' },
    { name: '找书', svg: 'file-search', url: '/home/find' },
    { name: 'VIP', svg: 'vip', url: '/home/vip' },
    { name: '我的', svg: 'my_fill', url: '/home/mine' }
];

class Home extends Component {
    render() {
        const { location } = this.props;
        let defaultIndex = 1;
        bottomTabs.find((item, index) => {
            if (item.url === location.pathname) {
                defaultIndex = index;
                return true;
            }
            return false;
        });

        return (
            <div className="home-wrapper">
                <Switch>
                    <Route exact path="/home/collection" component={Collection} />
                    <Route exact path="/home/find" component={Find} />
                    <Route exact path="/home/vip" component={Vip} />
                    <Route exact path="/home/mine" component={Mine} />
                    <Redirect exact from="/home" to="/home/find" />
                </Switch>
                <BottomTab tabs={bottomTabs} defaultIndex={defaultIndex} />
            </div>
        );
    }
}

Home.propTypes = {
    location: Proptypes.any
};

export default Home;
