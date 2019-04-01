import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import {
    Home,
    BookDetail,
    Login, Register,
    Reader,
    CommentDetail,
    BookUpload,
    Set,
    Search,
    Categories,
    Hots,
    Ranks,
    BookList,
    BookAnalysis,
    Subjects,
    Topic,
    Test
} from './pages';
import Entry from './components/Entry';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter basename="/">
                    <div>
                        <Entry noneDelay={0} />
                        <Switch>
                            <Route path="/home" component={Home} />
                            <Redirect exact from="/" to="/home" />
                            <Route path="/detail" component={BookDetail} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/reader" component={Reader} />
                            <Route path="/comment" component={CommentDetail} />
                            <Route path="/upload" component={BookUpload} />
                            <Route path="/set" component={Set} />
                            <Route path="/search" component={Search} />
                            <Route path="/categories" component={Categories} />
                            <Route path="/hots" component={Hots} />
                            <Route path="/ranks" component={Ranks} />
                            <Route path="/lists" component={BookList} />
                            <Route path="/analysis" component={BookAnalysis} />
                            <Route path="/subjects" component={Subjects} />
                            <Route path="/topic" component={Topic} />
                            <Route path="/test" component={Test} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
