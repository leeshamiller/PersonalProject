import React, { Component } from 'react';

class UpdateArea extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toggleModal: false,
            editTitle: props.editTitle,
            editTag: props.editTag,
            editNotes: props.editNotes,
            editDate: props.editDate,
            editCompleted: props.editCompleted
        }
    }

    toggle = () => {
        this.setState({
            toggleModal: !this.state.toggleModal
        })
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
        this.toggle()
    }

    updateProject() {
        this.props.updateProject(this.state.editTitle, this.props.project_id, this.props.area_id)
        this.setState({
            editTitle: ''
        })
        this.toggle()
    }

    updateTask() {
        this.props.updateTask(this.props.project_id, this.props.task_id, this.state.editTitle, this.state.editTag, this.state.editNotes, this.state.editDate, this.state.editCompleted)
        this.setState({
            editTitle: '',
            editTag: '',
            editNotes: '',
            editDate: new Date(),
            editCompleted: false
        })
        this.toggle()
    }


    render() {
        return (
            <div>
                {
                    this.props.project_id ? (

                        <div className='area-icon'>
                            <span onClick={this.toggle}><i className="fas fa-pencil-alt"></i></span>
                            {this.state.toggleModal ? (
                                <div>

                                    <p>
                                        <input
                                            value={this.state.editTitle}
                                            onChange={(e) => this.handleChange('editTitle', e.target.value)}
                                        />
                                    </p>
                                    <span onClick={() => this.updateProject()}><i class="fas fa-pencil-alt"></i>Save Edit</span>
                                </div>
                            ) : (null)}
                        </div>
                    ) : (
                            <div>
                                <span onClick={this.toggle}><i class="fas fa-pencil-alt"></i></span>
                                {this.state.toggleModal ? (
                                    <div>

                                        <p>

                                            <input
                                                value={this.state.editTitle}
                                                onChange={(e) => this.handleChange('editTitle', e.target.value)}
                                            />
                                        </p>
                                        <span onClick={() => this.updateArea()}><i class="fas fa-pencil-alt"></i>Save Edit</span>
                                    </div>
                                ) : (null)}

                            </div>
                        )

                }
            </div>
        )
    }
}

export default UpdateArea