import React, { Component } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import UpdateTask from './UpdateTask/UpdateTask';
// import { Spring } from 'react-spring';

import './Tabs.scss'

class Tabs extends Component {

    state = {
        sections: [],
        t_title: '',
        tag: '',
        notes: '',
        date: new Date(),
        editTitle: '',
        editTag: '',
        editNotes: '',
        completed: false,
        toggleAdd: false,
        toggleCalendar: false
    }

    toggle = () => {
        this.setState({
            completed: !this.state.completed
        })
    }

    toggleAdd = () => {
        this.setState({
            toggleAdd: !this.state.toggleAdd
        })
    }

    toggleCalendar = () => {
        this.setState({
            toggleCalendar: !this.state.toggleCalendar
        })
    }

    componentDidMount() {
        this.getTabsTasks()
    }

    getTabsTasks = async () => {
        const current_date = new Date().setHours(23, 59, 59, 999);
        let res = await axios.get(`/api/get-${this.props.header}/${this.props.user}&${current_date}`)
        this.setState({
            sections: res.data
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

    addTabsTask = async () => {
        const current_date = new Date().setHours(23, 59, 59, 999);
        const { t_title, tag, notes, date: task_date } = this.state;
        let res = await axios.post(`/api/add-task-${this.props.header}/${current_date}`, { t_title, tag, notes, task_date })
        this.setState({
            tasks: res.data,
            t_title: res.data.t_title,
            tag: res.data.tag,
            notes: res.data.notes
        })
        this.setState({
            t_title: '',
            tag: '',
            notes: ''
        })
        this.toggleAdd()
        this.getTabsTasks()
    }

    deleteTabsTask = async (task_id) => {
        const current_date = new Date().setHours(23, 59, 59, 999);
        let res = await axios.delete(`/api/delete-task-${this.props.header}/${task_id}&${current_date}`)
        this.setState({
            sections: res.data
        })
    }

    updateTabsTask = async (task_id, editNotes, editTag, editTitle) => {
        const current_date = new Date().setHours(23, 59, 59, 999);
        let res = await axios.put(`/api/update-task-${this.props.header}/${task_id}&${current_date}`, { editNotes, editTag, editTitle })
        this.setState({
            sections: res.data,
            editTitle: '',
            editTag: '',
            editNotes: ''
        })
    }

    updateTabsCompleted = async (task_id, completed) => {
        let res = await axios.put(`/api/update-complete/${task_id}`, { completed })
        this.setState({
            sections: res.data,
            completed: res.data.completed
        })
        this.getTabsTasks()
    }

    render() {

        const displaySections = this.state.sections.map((section, i) => {
            return (
                <div className="card" key={i}>
                    <div className="card-body">
                        <input type='checkbox' checked={section.completed} onClick={() => this.updateTabsCompleted(section.task_id, !section.completed)} />
                        {section.t_title}
                        <br />
                        {section.notes}
                        <span onClick={() => this.deleteTabsTask(section.task_id)}><i className="fas fa-trash-alt"></i></span>
                        <UpdateTask
                            task_id={section.task_id}
                            editNotes={this.state.editNotes}
                            editTag={this.state.editTag}
                            editTitle={this.state.editTitle}
                            updateTabsTask={this.updateTabsTask}
                        />
                    </div>
                </div>
            )
        })
        return (
            <div className='main-tabs'>
                <div className='header-container'>
                    <h1 className='tabs-header'>{this.props.header}</h1>
                    <span onClick={this.toggleAdd}><i className="fas fa-plus add-task-icon"></i></span>
                </div>
                {displaySections}
                {this.state.toggleAdd ? (

                    <div className='add-task-modal'>
                    <div className='task-edits'>
                        <label>Task Title:
                        <input
                                type='text'
                                onChange={(e) => this.handleChange('t_title', e.target.value)}
                                value={this.state.t_title}
                            />
                        </label>
                        <label>Task Tag:
                        <input
                                onChange={(e) => this.handleChange('tag', e.target.value)}
                                value={this.state.tag}
                            />
                        </label>
                        <label>Task Notes:
                        <input
                                onChange={(e) => this.handleChange('notes', e.target.value)}
                                value={this.state.notes}
                            />
                        </label>
                        </div>
                        <div className='task-icons'>
                            <span onClick={() => this.addTabsTask()}><i className="fas fa-plus"></i></span>
                            <label>
                                <i class="far fa-calendar-alt" onClick={this.toggleCalendar}></i>
                            </label>
                        </div>
                        {this.state.toggleCalendar ? (
                            <div>
                                <Calendar
                                    className='tabs-calendar'
                                    onChange={this.onChange}
                                    value={this.state.date}
                                />

                            </div>
                        ) : (null)}
                    </div>
                ) : (
                        null
                    )}
            </div>
        )
    }
}


export default Tabs;