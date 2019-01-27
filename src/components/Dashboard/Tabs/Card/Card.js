import React, { Component } from 'react';
import UpdateTask from '../UpdateTask/UpdateTask';
import axios from 'axios';


class Card extends Component {

  state = {
    cardToggle: false,
    editTitle: '',
        editTag: '',
        editNotes: '',
        sections: this.props.sections
  }

  cardToggle = () => {
    this.setState({
        cardToggle: !this.state.cardToggle
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
  this.props.getTabsTasks()
}

  render() {
    return (
    <div className="card" key={this.props.i} >
      <div className="card-body" >
        <div className='main-card' >
          <input type='checkbox' checked={this.props.completed} onChange={this.props.updateTabsCompleted} />
          <p className='title' onClick={this.cardToggle} >{this.props.t_title}</p>
        </div>
        {this.state.cardToggle ? (
          <div className='task-card-body'>
            <p className='text'>{this.props.notes}</p>
            <div className='card-icons'>
              <div onClick={this.props.deleteTabsTask}><i className="fas fa-trash-alt"></i></div>
              <UpdateTask
                task_id={this.props.task_id}
                editNotes={this.state.editNotes}
                editTag={this.state.editTag}
                editTitle={this.state.editTitle}
                updateTabsTask={this.updateTabsTask}
              />
            </div>
          </div>
    
        ) : (null)}
      </div>
    </div>

    )
  }
}

export default Card;