import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import AddProject from './AddProject/AddProject';
// import { getAreas, createArea, } from '../../../ducks/reducer';

class Area extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            areas: [],
            editTitle: ''
        }
    }

    componentDidMount() {
        return this.getAreas()
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
    }

    deleteArea = async (id) => {
        let res = await axios.delete(`/api/delete-area/${id}`)
        this.setState({
            areas: res.data
        })
    }   

    updateArea = async (id) => {
        const {editTitle} = this.state
        let res = await axios.put(`/api/update-area/${id}`, {editTitle})
        this.setState({
            areas: res.data,
            editTitle: ''
        })
    }
    
    render() {
        let displayAreas = this.state.areas.map((area, i) => {
            return (
                <div key={i}>
                    <h1>{area.title}</h1>
                    <button onClick={() => this.deleteArea(area.area_id)}>delete</button>
                    <p>
                        <input 
                        value={this.state.editTitle}
                        onChange={(e) => this.handleChange('editTitle', e.target.value)}
                        />
                    </p>
                    <button onClick={() => this.updateArea(area.area_id)}>Edit Area Title</button>
                </div>
            )
        })
        return (
            <div>
                Area
                <p>
                    Title:
                    <input
                        value={this.state.title}
                        onChange={(e) => this.handleChange('title', e.target.value)}
                    />
                </p>
                <button onClick={() => this.addArea()}>Add Area</button>
                {displayAreas}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Area);