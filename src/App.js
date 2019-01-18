import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Home, BookDetail, Login } from './pages';
import Entry from './components/Entry';

class App extends Component {
    render() {
        return (
            <BrowserRouter basename="/">
                <div>
                    <Entry noneDelay={0} />
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Redirect exact from="/" to="/home" />
                        <Route path="/detail" component={BookDetail} />
                        <Route path="/login" component={Login} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
