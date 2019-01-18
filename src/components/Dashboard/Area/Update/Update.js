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

    updateArea() {
        this.props.updateArea(this.props.area_id, this.state.editTitle)
        this.setState({
            editTitle: ''
        })
    }

    updateProject() {
        this.props.updateProject(this.state.editTitle, this.props.project_id, this.props.area_id)
        this.setState({
            editTitle: ''
        })
    }
    



    render() {
        return (
            <div>
                {this.props.project_id ? (
                    <div>
                        <p>
                            <input
                                value={this.state.editTitle}
                                onChange={(e) => this.handleChange('editTitle', e.target.value)}
                            />
                        </p>
                        <button onClick={() => this.updateProject()}>Edit Project</button>
                    </div>
                ) : (
                        <div>
                            <p>

                                <input
                                    value={this.state.editTitle}
                                    onChange={(e) => this.handleChange('editTitle', e.target.value)}
                                />
                            </p>
                            <button onClick={() => this.updateArea()}>Edit Area</button>
                        </div>
                    )

                }
            </div>
        )
    }
}

export default UpdateArea