import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Entry from './components/Entry';

class App extends Component {
    render() {
        return (
            <BrowserRouter basename="/">
                <div>
                    <Entry />
                    <Switch>
                        <Route exact path="/" component={Home} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
