import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { getUserData, getInbox, getToday, getUpcoming, getSomeday, getLogbook, getTabsTasks } from '../../../ducks/reducer';
import Dashboard from '../Dashboard';
import { Badge } from 'react-bootstrap';

import './Nav.scss';

class Nav extends Component {

    async componentDidMount() {
        let res = await axios('/auth/user-data');
        this.props.getUserData(res.data)

        this.getInbox()
        this.getToday()
        this.getUpcoming()
        this.getSomeday()
        this.getLogbook()
    }

    async componentDidUpdate(prevProps) {
        if (this.props.sections.length !== prevProps.inbox.length && this.props.location.pathname === '/private/inbox') {
            this.getInbox()
            this.getLogbook()
        }
        if (this.props.sections.length !== prevProps.sections.length && this.props.location.pathname === '/private/today') {
            this.getToday()
            this.getLogbook()
        }
        if (this.props.sections.length !== prevProps.sections.length && this.props.location.pathname === '/private/upcoming') {
            this.getUpcoming()
            this.getLogbook()
        }
        if (this.props.sections.length !== prevProps.sections.length && this.props.location.pathname === '/private/someday') {
            this.getSomeday()
            this.getLogbook()
        }
        if (this.props.sections.length !== prevProps.logbook.length && this.props.location.pathname === '/private/logbook') {
            this.getLogbook()
            this.getInbox()
            this.getToday()
            this.getUpcoming()
            this.getSomeday()

        }
    }

    getInbox = async () => {
        const current_date = new Date().setHours(23, 59, 59, 999);
        let res = await axios.get(`/api/get-Inbox/${this.props.id}&${current_date}`)
        this.props.getInbox(res.data)
    }

    getToday = async () => {
        const current_date = new Date().setHours(23, 59, 59, 999);
        let res = await axios.get(`/api/get-Today/${this.props.id}&${current_date}`)
        this.props.getToday(res.data)
    }

    getUpcoming = async () => {
        const current_date = new Date().setHours(23, 59, 59, 999);
        let res = await axios.get(`/api/get-Upcoming/${this.props.id}&${current_date}`)
        this.props.getUpcoming(res.data)
    }

    getSomeday = async () => {
        const current_date = new Date().setHours(23, 59, 59, 999);
        let res = await axios.get(`/api/get-Someday/${this.props.id}&${current_date}`)
        this.props.getSomeday(res.data)
    }

    getLogbook = async () => {
        const current_date = new Date().setHours(23, 59, 59, 999);
        let res = await axios.get(`/api/get-Logbook/${this.props.id}&${current_date}`)
        this.props.getLogbook(res.data)
    }

    render() {
        const { id } = this.props.user
        return (
            <div className='nav-container'>
                {id ? (
                    <div className='daddy-div'>
                    <div id='nav' className='nav'>
                        <div className='nav-buttons'>
                            <Link to='/private/inbox'>
                                <div className='button-and-badge'>
                                    <button className='nav-button'>Inbox</button>
                                    <Badge>{this.props.inbox.length}</Badge>
                                </div>
                            </Link>
                            <Link to='/private/today'>
                                <div className='button-and-badge'>
                                    <button className='nav-button'>Today</button>
                                    <Badge>{this.props.today.length}</Badge>
                                </div>
                            </Link>
                            <Link to='/private/upcoming'>
                                <div className='button-and-badge'>
                                    <button className='nav-button'>Upcoming</button>
                                    <Badge>{this.props.upcoming.length}</Badge>
                                </div>
                            </Link>
                            <Link to='/private/someday'>
                                <div className='button-and-badge'>
                                    <button className='nav-button'>Someday</button>
                                    <Badge>{this.props.someday.length}</Badge>
                                </div>
                            </Link>
                            <Link to='/private/logbook'>
                                <div className='button-and-badge'>
                                    <button className='nav-button'>Logbook</button>
                                    <Badge>{this.props.logbook.length}</Badge>
                                </div>
                            </Link>
                            <Link to='/private/area'>
                                <div className='button-and-badge'>
                                    <button className='nav-button'>Area</button>
                                    <Badge></Badge>
                                </div>
                            </Link>
                            <a href={process.env.REACT_APP_LOGOUT}>
                                <div className='button-and-badge'>
                                    <button className='nav-button'>Logout</button>
                                    <Badge></Badge>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className='main'>
                        <Dashboard />
                    </div>
                    </div>
                ) : <p>Please log in. <Link to='/'>homepage</Link></p>
                }
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUserData, getInbox, getToday, getUpcoming, getSomeday, getLogbook, getTabsTasks })(Nav)