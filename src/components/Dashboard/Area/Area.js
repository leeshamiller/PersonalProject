import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import './Area.scss';
import ThreeDots from './ThreeDots/ThreeDots';

class Area extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            areas: [],
            editTitle: '',
            toggleAdd: false,
            
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

    getAreas = async () => {
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
                <ThreeDots 
                key={i}
                i={i}
                title={area.title}
                deleteArea={() => this.deleteArea(area.area_id)}
                area_id={area.area_id}
                updateArea={this.updateArea}
                getAreas={this.getAreas}
                />
            )
        })
        return (
            <div>
                <div className='header-container'>
                    <h1 className='tabs-header'>Area</h1>
                    <span onClick={this.toggle}>
                        <i className="fas fa-plus toggleAdd"></i>
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