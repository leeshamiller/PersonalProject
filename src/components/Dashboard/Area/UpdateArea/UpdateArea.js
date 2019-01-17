import React, { Component } from 'react';

class UpdateArea extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editTitle: this.props.editTitle
        }
    }

    handleChange(props, val) {
        this.setState({
            [props]: val
        })
    }

    updateAreas() {
        this.props.updateArea(this.props.area_id, this.state.editTitle)
        this.setState({
            editTitle: ''
        })
    }

    

    render() {
        return (
            <div>
                <p>
                        <input 
                        value={this.state.editTitle}
                        onChange={(e) => this.handleChange('editTitle', e.target.value)}
                        />
                    </p>
                    <button onClick={() => this.updateAreas()}>Edit Area Title</button>
            </div>
        )
    }
}

export default UpdateArea