import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { getUserData } from '../../../ducks/reducer';
import Dashboard from '../Dashboard';

import './Nav.scss';

class Nav extends Component {

    async componentDidMount() {
        let res = await axios('/auth/user-data');
        this.props.getUserData(res.data)
    }

    render() {

        const { id } = this.props.user
        return (
            <div className='nav-container'>
                { id ? (
                    <div id='nav' className='nav'>
                        <Link to='/private/inbox'>
                            <button>Inbox</button>
                        </Link>
                        <Link to='/private/today'>
                            <button>Today</button>
                        </Link>
                        <Link to='/private/upcoming'>
                            <button>Upcoming</button>
                        </Link>
                        <Link to='/private/someday'>
                            <button>Someday</button>
                        </Link>
                        <Link to='/private/logbook'>
                            <button>Logbook</button>
                        </Link>
                        <Link to='/private/area'>
                            <button>Area</button>
                        </Link>
                        <a href='http://localhost:4321/auth/logout'>
                            <button>Logout</button>
                        </a>
                        <Dashboard />
                    </div>
                ) : <p>Please log in. <Link to='/'>homepage</Link></p>
                }
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUserData })(Nav)