import React, { Component } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';

class Tabs extends Component {

    state = {
        sections: [],
        t_title: '',
        tag: '',
        notes: '',
        date: new Date()
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
        this.getTabsTasks()
    }
    
    deleteTabsTask = async (task_id) => {
        const current_date = new Date().setHours(23, 59, 59, 999);
        let res = await axios.delete(`/api/delete-task-${this.props.header}/${task_id}&${current_date}`)
        this.setState({
            sections: res.data
        })
    }

    render() {
        const displaySections = this.state.sections.map((section, i) => {
            return (
                <div className="card" key={i}>
                    <div className="card-body">
                        <input type='checkbox' value='on' />
                        {section.t_title}
                        <br />
                        {section.notes}
                        <button onClick={() => this.deleteTabsTask(section.task_id)}>delete task</button>
                    </div>
                </div>
            )
        })
        return (
            <div>
                {this.props.header}
                {displaySections}
                <div>
                    <button onClick={() => this.addTabsTask()}>AddTabsTask</button>
                    <label>Task Title:
                    <input
                        type='text'
                        onChange={(e) => this.handleChange('t_title', e.target.value)}
                        value={this.state.t_title}
                    />
                    </label>
                    <label>Task Tag</label>
                    <input
                        onChange={(e) => this.handleChange('tag', e.target.value)}
                        value={this.state.tag}
                    />
                    <label>Task Notes</label>
                    <input
                        onChange={(e) => this.handleChange('notes', e.target.value)}
                        value={this.state.notes}
                    />
                    <label>Task Date:</label>
                    <Calendar 
                    onChange={this.onChange}
                    value={this.state.date}
                    />
                </div>
            </div>
        )
    }
}

export default Tabs;