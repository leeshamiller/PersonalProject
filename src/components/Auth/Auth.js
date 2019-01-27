import React, { Component } from 'react';
import axios from 'axios';

import './Auth.scss';

class Auth extends Component {

    state = {
        username: '',
        password: ''
    }

    handleChange(prop, val) {
        this.setState({
            [prop]: val
        })
    }

    async login() {
        const { username, password } = this.state;
        const res = await axios.post('/auth/login', { username, password })
        if (res.data.loggedIn) {
            this.props.history.push('/private')
        }
    }

    async register() {
        const { username, password } = this.state;
        const res = await axios.post('/auth/register', { username, password })
        if (res.data.loggedIn) {
            this.props.history.push('/private')
        }

    }

    render() {
        return (
            <div className='login-main'>
                <div className='login-modal'>
                    <h1>Plan your next adventure!</h1>
                    <p>
                        Username:
                    <input
                            type='text'
                            value={this.state.username}
                            onChange={(e) => this.handleChange('username', e.target.value)}
                        />
                    </p>
                    <p>
                        Password:
                    <input
                            type='password'
                            value={this.state.password}
                            onChange={(e) => this.handleChange('password', e.target.value)}
                        />
                    </p>
                    <button onClick={() => this.login()} >Login</button>
                    <p>New user?</p>
                    <button onClick={() => this.register()} >Register</button>
                </div>
            </div>
        )
    }
}

export default Auth