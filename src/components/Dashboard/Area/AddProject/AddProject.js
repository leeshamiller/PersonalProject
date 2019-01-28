import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Update from '../Update/Update';
import AddTask from '../../AddTask/AddTask';

import './AddProject.scss';

class AddProject extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            projects: [],
            editTitle: '',
            toggleAdd: false
        }
    }

    toggle = () => {
        this.setState({
            toggleAdd: !this.state.toggleAdd
        })
    }

    componentDidMount() {
        this.getProjects()
    }

    getProjects = async () => {
        let res = await axios.get(`/api/get-projects/${this.props.id}`)
        this.setState({
            projects: res.data
        })

    }

    handleChange(prop, val) {
        this.setState({
            [prop]: val
        })
    }

    deleteProject = async (project_id, area_id) => {
        let res = await axios.delete(`/api/delete-project/${project_id}&${area_id}`)
        this.setState({
            projects: res.data
        })
    }

    updateProject = async (editTitle, project_id, area_id) => {
        let res = await axios.put(`/api/update-project/${project_id}&${area_id}`, {editTitle})
        this.setState({
            projects: res.data,
            editTitle: ''
        })
    }

    render() {
        const displayProjects = this.state.projects.map((project, i) => {
            return (
                <div className='add-project-div' key={i}>
                    <p className='add-project-title'>{project.project_title}</p>
                    <div className='add-project-icons'>

                    <span onClick={() => this.deleteProject(project.project_id, project.area_id)}><i className="fas fa-trash-alt"></i></span>

                    <Update 
                    project_id={project.project_id}
                    area_id={project.area_id}
                    editTitle={this.state.editTitle}
                    updateProject={this.updateProject}
                    />

                    </div>
                    <AddTask 
                    id={project.project_id}
                    />

                </div>
            )
        })
        return (
            <div className='projects-div'>
                {displayProjects}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(AddProject);