import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';

class App extends Component {
    render() {
        return (
            <BrowserRouter basename="/">
                <div>
                    <Switch>
                        <Route exact={true} path="/" component={Home} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
