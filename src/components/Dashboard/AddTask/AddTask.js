import React, { Component } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import UpdateTask from '../Tabs/UpdateTask/UpdateTask';

class AddTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            completed: false,
            date: new Date(),
            tag: '',
            notes: '',
            tasks: [],
            editTitle: '',
            editTag: '',
            editNotes: '',
            editDate: new Date(),
            editCompleted: false
        }
    }

    componentDidMount() {
        this.getTasks()
    }

    getTasks = async () => {
        let res = await axios.get(`/api/get-tasks/${this.props.id}`)
        this.setState({
            tasks: res.data
        })
    }

    handleChange(prop, val) {
        this.setState({
            [prop]: val
        })
    }

    onChange = (date) => {
        this.setState({
            date
        })
    }

    addTask = async (id) => {
        const {title, completed, tag, notes} = this.state;
        const date = this.state.date.setHours(23, 59, 59, 999);
        let res = await axios.post(`/api/add-task/${id}`, {title, completed, date, tag, notes})
        this.setState({
            tasks: res.data,
            title: res.data.t_title,
            completed: res.data.completed,
            date: res.data.task_date,
            tag: res.data.tag,
            notes: res.data.notes
        })
        this.setState({
            title: '',
            completed: false,
            date: new Date(),
            tag: '',
            notes: ''
        })
    }

    deleteTask = async (project_id, task_id) => {
        let res = await axios.delete(`/api/delete-task/${project_id}&${task_id}`)
        this.setState({
            tasks: res.data
        })
    }

    updateTask = async (t_project_id, task_id, editTitle, editTag, editNotes, editDate, editCompleted) => {
        let res = await axios.put(`/api/update-task/${t_project_id}&${task_id}`, {editTitle, editTag, editNotes, editDate, editCompleted})
        this.setState({
            tasks: res.data,
            editTitle: '',
            editTag: '',
            editNotes: '',
            editDate: new Date(),
            editCompleted: false
        })
    }

    updateCompleted = async (task_id, completed) => {
        let res = await axios.put(`/api/update-complete/${task_id}`, {completed})
        this.setState({
            tasks: res.data,
            completed: res.data.completed
        })
        this.getTasks()
    }


    render() {
        const displayTasks = this.state.tasks.map((task, i) => {
            return (
                <div className='card' key={i}>
                <div className='card-body'>
                    <input type='checkbox' checked={task.completed} onClick={() => this.updateCompleted(task.task_id, !task.completed)} 
                    />
                    <h3>Task: {task.t_title}</h3>
                    <h4>{task.notes}</h4>
                    <h5>{task.task_date}</h5>
                    <h5>Tag: {task.tag}</h5>

                    <button onClick={() => this.deleteTask(task.project_id, task.task_id)}>delete task</button>

                    <UpdateTask 
                    updateTask={this.updateTask}
                    t_project_id={task.t_project_id}
                    task_id={task.task_id}
                    editTitle={this.state.editTitle}
                    editTag={this.editTag}
                    editNotes={this.state.editNotes}
                    editDate={this.state.editDate}
                    editCompleted={this.state.editCompleted}
                    />
                    </div>
                </div>
            )
        })
        return (
            <div>
                <button onClick={() => this.addTask(this.props.id)}>Add Task</button>
                <input 
                value={this.state.title}
                onChange={(e) => this.handleChange('title', e.target.value)}
                placeholder='title'
                />
                <Calendar 
                onChange={this.onChange}
                value={this.state.date}
                />
                <input 
                value={this.state.tag}
                onChange={(e) => this.handleChange('tag', e.target.value)}
                placeholder='tag'
                />
                <input 
                value={this.state.notes}
                onChange={(e) => this.handleChange('notes', e.target.value)}
                placeholder='notes'
                />
                {displayTasks}
            </div>
        )
    }
}

export default AddTask;