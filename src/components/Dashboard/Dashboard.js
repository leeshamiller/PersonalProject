import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Inbox from './Inbox/Inbox';
import Today from './Today/Today';
import Upcoming from './Upcoming/Upcoming';
import Someday from './Someday/Someday';
import Logbook from './Logbook/Logbook';
import Nav from './Nav/Nav';
// import axios from 'axios';

class Dashboard extends Component {

    // async componentDidMount() {
    //     let res = await axios.get('/api/user-data')
    // }

    render() {
        return (
            <div>
                Dashboard
                <br />
                Ducks ready for takeoff!
                <br />
                <Nav />
                <Switch>
                    <Route exact path='/private/inbox' component={Inbox} />
                    <Route exact path='/private/today' component={Today} />
                    <Route exact path='/private/upcoming' component={Upcoming} />
                    <Route exact path='/private/someday' component={Someday} />
                    <Route exact path='/private/logbook' component={Logbook} />
                </Switch>
            </div>
        )
    }
}

export default Dashboard;