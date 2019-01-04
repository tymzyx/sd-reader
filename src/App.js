import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Entry from './pages/Entry';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            entry: true
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                entry: false
            });
        }, 5500);
    }

    render() {
        return (
            <BrowserRouter basename="/">
                <div>
                    {this.state.entry ? (
                        <Entry />
                    ) : ''}
                    <Switch>
                        <Route exact path="/" component={Home} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
