import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { getUserData } from '../../../ducks/reducer';

class Nav extends Component {

    async componentDidMount() {
        let res = await axios('/api/user-data');
        this.props.getUserData(res.data)
    }

    render() {

        const { id } = this.props.user
        return (
            <div>
                { id ? (
                    <div>
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
                        <a href='http://localhost:4321/auth/logout'>
                            <button>Logout</button>
                        </a>
                    </div>
                ) : <p>Please log in. <Link to='/'>homepage</Link></p>
                }
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUserData })(Nav)