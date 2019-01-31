import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Home, BookDetail, Login, Register, Reader, CommentDetail } from './pages';
import Entry from './components/Entry';
import { withRouter } from "react-router";

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
                        <Route path="/register" component={withRouter(Register)} />
                        <Route path="/reader" component={Reader} />
                        <Route path="/comment" component={CommentDetail} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
