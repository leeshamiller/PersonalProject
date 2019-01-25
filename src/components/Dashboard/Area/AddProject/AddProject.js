import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Update from '../Update/Update';
import AddTask from '../../AddTask/AddTask';

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

    addProject = async (id) => {
        const { title } = this.state;
        let res = await axios.post(`/api/add-project/${id}`, { title })
        this.setState({
            projects: res.data,
            title: ''
        })
        this.toggle()
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
                <div key={i}>
                    <h2>{project.project_title}</h2>

                    <span onClick={() => this.deleteProject(project.project_id, project.area_id)}><i class="fas fa-trash-alt"></i></span>

                    <Update 
                    project_id={project.project_id}
                    area_id={project.area_id}
                    editTitle={this.state.editTitle}
                    updateProject={this.updateProject}
                    />

                    <AddTask 
                    id={project.project_id}
                    />

                </div>
            )
        })
        return (
            <div>
                <span onClick={this.toggle}>
                    <i class="fas fa-plus"></i>
                    Add Project
                </span>
                {this.state.toggleAdd ? (
                    <div>
                        <button onClick={() => this.addProject(this.props.id)}>Add Project</button>
                        <input
                            value={this.state.title}
                            onChange={(e) => this.handleChange('title', e.target.value)}
                            />
                    </div>
                ) : (null)}
                {displayProjects}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(AddProject);