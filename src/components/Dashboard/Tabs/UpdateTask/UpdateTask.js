import React, { Component } from 'react';

class UpdateTask extends Component {
    state = {
        toggleModal: false,
        editTitle: this.props.editTitle,
        editTag: this.props.editTag,
        editNotes: this.props.editNotes
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

    updateTabsTask() {
        this.props.updateTabsTask(this.props.task_id, this.state.editNotes, this.state.editTag, this.state.editTitle)
        this.setState({
            editNotes: '',
            editTag: '',
            editTitle: ''
        })
        this.toggle()
    }

    render() {
        return (
            <div>
                <button onClick={this.toggle}>Edit Task</button>
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
                        <button onClick={() => this.updateTabsTask()}>save</button>
                        <button onClick={this.toggle}>cancel</button>
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