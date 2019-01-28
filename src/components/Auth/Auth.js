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
                    <h1 className='auth-header'>Plan your next adventure!</h1>
                    <p className='auth-text'>
                        Username:
                    <input
                            className='auth-input user'
                            type='text'
                            value={this.state.username}
                            onChange={(e) => this.handleChange('username', e.target.value)}
                        />
                    </p>
                    <p className='auth-text'>
                        Password:
                    <input
                            className='auth-input pass'
                            type='password'
                            value={this.state.password}
                            onChange={(e) => this.handleChange('password', e.target.value)}
                        />
                    </p>
                    <button className='auth-login' onClick={() => this.login()} >Login</button>
                    <div className='new-user-div'>
                    <p className='auth-text new-user'>New user?</p>
                    <button className='auth-register' onClick={() => this.register()} >Create Account</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Auth