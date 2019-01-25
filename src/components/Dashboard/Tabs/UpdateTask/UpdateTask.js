import React, { Component } from 'react';
import Calendar from 'react-calendar';

class UpdateTask extends Component {
    state = {
        toggleModal: false,
        editTitle: this.props.editTitle,
        editTag: this.props.editTag,
        editNotes: this.props.editNotes,
        editDate: this.props.editDate,
        editCompleted: this.props.editCompleted,
        toggleCalendar: false
    }

    toggle = () => {
        this.setState({
            toggleModal: !this.state.toggleModal
        })
    }

    toggleCalendar = () => {
        this.setState({
            toggleCalendar: !this.state.toggleCalendar
        })
    }

    handleChange(props, val) {
        this.setState({
            [props]: val
        })
    }

    onChange = (editDate) => {
        this.setState({
            editDate
        })
    }

    updateTabsTask() {
        this.props.updateTabsTask(this.props.task_id, this.state.editNotes, this.state.editTag, this.state.editTitle)
        this.setState({
            editNotes: '',
            editTag: '',
            editTitle: ''
        })
        this.toggle()
    }

    updateTask() {
        this.props.updateTask(this.props.t_project_id, this.props.task_id, this.state.editTitle, this.state.editTag, this.state.editNotes, this.state.editDate, this.state.editCompleted)
        this.setState({
            editTitle: '',
            editTag: '',
            editNotes: '',
            editDate: new Date(),
            editCompleted: false
        })
        console.log(this.state)
        this.toggle()
    }

    render() {
        return (
            <div>
                <span onClick={this.toggle}><i class="fas fa-pencil-alt"></i></span>
                {this.state.toggleModal ? (
                    <div>
                        <label>Task Title</label>
                        <input
                            value={this.state.editTitle}
                            onChange={(e) => this.handleChange('editTitle', e.target.value)}
                        />
                        <label>Task Tag</label>
                        <input
                            value={this.state.editTag}
                            onChange={(e) => this.handleChange('editTag', e.target.value)}
                        />
                        <label>Task Notes</label>
                        <input
                            value={this.state.editNotes}
                            onChange={(e) => this.handleChange('editNotes', e.target.value)}
                        />
                        {this.props.t_project_id ? (
                            <div>
                                {this.props.toggleCalendar ? (
                                    <div>
                                        <Calendar
                                            className='tabs-calendar'
                                            onChange={this.onChange}
                                            value={this.state.date}
                                        />
                                    </div>
                                ) : (null)}
                                <label>
                                    <i class="far fa-calendar-alt" onClick={this.toggleCalendar}></i>
                                </label>
                                <button onClick={() => this.updateTask()}>save</button>
                                <button onClick={this.toggle}>cancel</button>
                            </div>
                        ) : (
                                <div>
                                    <button onClick={() => this.updateTabsTask()}>save</button>
                                    <button onClick={this.toggle}>cancel</button>
                                </div>

                            )
                        }
                    </div>
                ) : (
                        null
                    )
                }
            </div>
        )
    }
}

export default UpdateTask;