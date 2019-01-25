import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { getUserData } from '../../../ducks/reducer';
import Dashboard from '../Dashboard';
import { Badge } from 'react-bootstrap';

import './Nav.scss';

class Nav extends Component {

    async componentDidMount() {
        let res = await axios('/auth/user-data');
        this.props.getUserData(res.data)
    }

    render() {
        // console.log(this.props)
        const { id } = this.props.user
        return (
            <div className='nav-container'>
                {id ? (
                    <div id='nav' className='nav'>
                        <div className='nav-buttons'>
                            <Link to='/private/inbox'>
                                <div className='button-and-badge'>
                                    <button className='nav-button'>Inbox</button>
                                    <Badge>2</Badge>
                                </div>
                            </Link>
                            <Link to='/private/today'>
                                <div className='button-and-badge'>
                                    <button className='nav-button'>Today</button>
                                    <Badge>2</Badge>
                                </div>
                            </Link>
                            <Link to='/private/upcoming'>
                                <div className='button-and-badge'>
                                    <button className='nav-button'>Upcoming</button>
                                    <Badge>2</Badge>
                                </div>
                            </Link>
                            <Link to='/private/someday'>
                                <div className='button-and-badge'>
                                    <button className='nav-button'>Someday</button>
                                    <Badge>2</Badge>
                                </div>
                            </Link>
                            <Link to='/private/logbook'>
                                <div className='button-and-badge'>
                                    <button className='nav-button'>Logbook</button>
                                    <Badge>2</Badge>
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

export default connect(mapStateToProps, { getUserData })(Nav)