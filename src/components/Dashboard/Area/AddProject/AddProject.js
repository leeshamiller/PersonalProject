import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import { getProjects, createProject } from '../../../../ducks/reducer';

class AddProject extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            projects: [],
            editTitle: ''
        }
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
    }

    deleteProject = async (project_id, area_id) => {
        let res = await axios.delete(`/api/delete-project/${project_id}&${area_id}`)
        this.setState({
            projects: res.data
        })
    }

    render() {
        const displayProjects = this.state.projects.map((project, i) => {
            // console.log(project)
            return (
                <div key={i}>
                    <h2>{project.project_title}</h2>

                    <button onClick={() => this.deleteProject(project.project_id, project.area_id)}>delete Project</button>

                </div>
            )
        })
        return (
            <div>
                {displayProjects}
                <button onClick={() => this.addProject(this.props.id)}>Add Project</button>
                <input
                    value={this.state.title}
                    onChange={(e) => this.handleChange('title', e.target.value)}
                />
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(AddProject);