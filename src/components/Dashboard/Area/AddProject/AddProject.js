import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { getProjects, createProject } from '../../../../ducks/reducer';

class AddProject extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            title: '',
            projects: []
        }
    }

    componentDidMount() {
        return this.getProjects()
    }

    getProjects() {
        axios.get(`/api/get-projects/${this.props.user.id}`).then((res) => {
            this.setState({
                projects: res.data
            })
        })
    }

    handleChange(prop, val) {
        this.setState({
            [prop]: val
        })
    }

    addProject = async () => {
        const { title } = this.state;
        console.log(this.props)
        let res = await axios.post('/api/add-project', {id: this.props.user.id, title})
        this.setState({
            projects: res.data,
            title: ''
        })
    }

    render() {
        const displayProjects = this.state.projects.map((project, i) => {
            return (
                <div key={i}>
                    {project.title}
                </div>
            )
        })
        return (
            <div>
                    {displayProjects}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, {getProjects})(AddProject);