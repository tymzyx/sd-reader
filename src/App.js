import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Entry from './components/Entry';

class App extends Component {
    render() {
        return (
            <BrowserRouter basename="/">
                <div>
                    <Entry noneDelay={5600} />
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Redirect exact from="/" to="/home" />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
