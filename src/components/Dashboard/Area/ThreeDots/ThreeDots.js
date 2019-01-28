import React, {Component} from 'react';
import Update from '../Update/Update';
import AddProject from '../AddProject/AddProject';
import axios from 'axios';
import {connect} from 'react-redux';

import './ThreeDots.scss';

class ThreeDots extends Component {
    state  = {
        toggleIcons: false,
        editTitle: '',
        toggleAddProject: false,
        title: '',
        projects: []
    }

    toggleIcons = () => {
        this.setState({
            toggleIcons: !this.state.toggleIcons
        })
    }

    toggleAddProject = () => {
        this.setState({
            toggleAddProject: !this.state.toggleAddProject
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
        this.toggleAddProject()
        this.getProjects()
        this.props.getAreas()
    }

    getProjects = async () => {
        let res = await axios.get(`/api/get-projects/${this.props.area_id}`)
        this.setState({
            projects: res.data
        })

    }

    render() {
        return (
            <div className='area-main' key={this.props.i}>
                <div className='area-div'>
                <div className='area-title-div'>
                    <div className='three-dots-title'>{this.props.title}</div>
                    <div onClick={this.toggleIcons}><i className="fas fa-ellipsis-v"></i></div>
                    </div>
                    {this.state.toggleIcons ? (
                        <div className='area-icons'>
                            <div onClick={this.toggleAddProject} className='area-icon'>
                                <i class="fas fa-plus"></i>
                                Add Project
                            </div>
                            <div onClick={this.props.deleteArea} className='area-icon'><i className="fas fa-trash-alt"></i></div>

                            <Update
                                area_id={this.props.area_id}
                                editTitle={this.state.editTitle}
                                updateArea={this.props.updateArea}
                                />
                            {this.state.toggleAddProject ? (
                                <div>
                                    <button onClick={() => this.addProject(this.props.area_id)}>Add Project</button>
                                    <input
                                        value={this.state.title}
                                        onChange={(e) => this.handleChange('title', e.target.value)}
                                        />
                                </div>
                            ) : (null)}

                        </div>
                    ) : (null)}
                    </div>

                    <AddProject
                        id={this.props.area_id}
                    />

                </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState;


export default connect(mapStateToProps)(ThreeDots)