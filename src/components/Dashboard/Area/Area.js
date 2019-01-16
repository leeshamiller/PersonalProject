import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Area extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            areas: [
                {
                    user_id: 0,
                    title: '',
                    area_id: 0
                }
            ]
        }
    }


    async componentDidMount() {
        await this.getAreas()
    }

     componentDidUpdate(prevProps, prevState) {
         if (prevState !== this.state) {
           return this.getAreas()
        } 
    }

    async getAreas() {
      let res = await axios.get('/api/get-areas')
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
            areas: [this.props.areas.push(res.data.userData)],
            title: ''
        })
    }

    render() {
        let displayAreas = this.state.areas.map((area, i) => {
            return (
                <div key={i}>
                    {area.title}
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