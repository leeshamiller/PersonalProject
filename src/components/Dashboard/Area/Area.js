import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Update from './Update/Update';
import AddProject from './AddProject/AddProject';

import './Area.scss';

class Area extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            areas: [],
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
        this.getAreas()
    }


    async getAreas() {
        let res = await axios.get(`/api/get-areas/${this.props.user.id}`)
        this.setState({
            areas: res.data
        })
    }

    handleChange(prop, val) {
        this.setState({
            [prop]: val
        })
    }

    addArea = async () => {
        const { title } = this.state;
        let res = await axios.post('/api/add-area', { id: this.props.user.id, title })
        this.setState({
            areas: res.data,
            title: ''
        })
        this.toggle()
        this.getAreas()
    }

    deleteArea = async (id) => {
        let res = await axios.delete(`/api/delete-area/${id}`)
        this.setState({
            areas: res.data
        })
    }

    updateArea = async (id, editTitle) => {
        let res = await axios.put(`/api/update-area/${id}`, { editTitle })
        this.setState({
            areas: res.data,
            editTitle: ''
        })
        

    }


    render() {
        let displayAreas = this.state.areas.map((area, i) => {
            return (
                <div className='area-main' key={i}>
                    <h1>{area.title}</h1>

                    <span onClick={() => this.deleteArea(area.area_id)}><i className="fas fa-trash-alt"></i></span>

                    <Update
                        area_id={area.area_id}
                        editTitle={this.state.editTitle}
                        updateArea={this.updateArea}
                    />

                    <AddProject
                        id={area.area_id}
                    />

                </div>
            )
        })
        return (
            <div>
                <div className='header-container'>
                    <h1 className='tabs-header'>Area</h1>
                    <span onClick={this.toggle}>
                        <i class="fas fa-plus toggleAdd"></i>
                    </span>
                </div>
                {this.state.toggleAdd ? (
                    <div>
                        <p>
                            Title:
                            <input
                                value={this.state.title}
                                onChange={(e) => this.handleChange('title', e.target.value)}
                            />
                        </p>
                        <span onClick={() => this.addArea()}><i className="fas fa-plus"></i>Add Area</span>
                    </div>
                ) : (null)}
                {displayAreas}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Area);