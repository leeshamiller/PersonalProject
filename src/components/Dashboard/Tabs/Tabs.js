import React, { Component } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import { connect } from 'react-redux';
import { getTabsTasks } from '../../../ducks/reducer';
import Card from './Card/Card';
// import { Spring } from 'react-spring';

import './Tabs.scss';
import './UpdateTask/UpdateTask.scss';

class Tabs extends Component {

    state = {
        sections: [],
        t_title: '',
        tag: '',
        notes: '',
        date: new Date(),
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
        this.props.getTabsTasks(res.data)
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
        this.getTabsTasks()
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
                <Card 
                key={i}
                completed={section.completed}
                updateTabsCompleted={() => this.updateTabsCompleted(section.task_id, !section.completed)}
                t_title={section.t_title}
                notes={section.notes}
                deleteTabsTask={() => this.deleteTabsTask(section.task_id)}
                task_id={section.task_id}
                header={this.props.header}
                sections={this.state.sections}
                i={i}
                getTabsTasks={() => this.getTabsTasks()}
                />
            )
        })
        return (
            <div className='main-tabs'>
                <div className='header-container'>
                    <h1 className='tabs-header'>{this.props.header}</h1>
                    <div onClick={this.toggleAdd}><i className="fas fa-plus add-task-icon"></i></div>
                </div>
                {displaySections}
                {this.state.toggleAdd ? (

                    <div className='edit-div-container'>
                        <div className='edit-task-div'>
                        <div className='task-title-div'>
                            <label className=''>Title:
                        <input
                                    type='text'
                                    className='edit-title-input'
                                    onChange={(e) => this.handleChange('t_title', e.target.value)}
                                    value={this.state.t_title}
                                />
                            </label>
                                </div>
                                {/* <div className='task-tag-div'>
                            <label>Tag:
                        <input
                                    onChange={(e) => this.handleChange('tag', e.target.value)}
                                    className='edit-tag-input'
                                    value={this.state.tag}
                                />
                            </label>
                                </div> */}
                                <div className='edit-notes-input'>
                            <label>Notes:
                        <textarea
                                    onChange={(e) => this.handleChange('notes', e.target.value)}
                                    className='edit-notes-input'
                                    value={this.state.notes}
                                ></textarea>
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
                    </div>
                ) : (
                        null
                    )}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getTabsTasks })(Tabs);