import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Inbox from './Inbox/Inbox';
import Today from './Today/Today';
import Upcoming from './Upcoming/Upcoming';
import Someday from './Someday/Someday';
import Logbook from './Logbook/Logbook';
import Area from './Area/Area';

class Dashboard extends Component {

    render() {
        return (
            <div>
                Dashboard
                <br />
                Ducks ready for takeoff!
                <br />
                <Switch>
                    <Route exact path='/private/inbox' component={Inbox} />
                    <Route exact path='/private/today' component={Today} />
                    <Route exact path='/private/upcoming' component={Upcoming} />
                    <Route exact path='/private/someday' component={Someday} />
                    <Route exact path='/private/logbook' component={Logbook} />
                    <Route exact path='/private/area' component={Area} />
                </Switch>
            </div>
        )
    }
}

export default Dashboard;