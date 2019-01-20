import React, { Component } from 'react';
import axios from 'axios';

class Tabs extends Component {

    state = {
        sections: []
    }

    async componentDidMount() {
        const current_date = new Date().setHours(23, 59, 59, 999);
        let res = await axios.get(`/api/get-${this.props.header}/${this.props.user}&${current_date}`)
        this.setState({
            sections: res.data
        })
    }
    
    render () {
        const displaySections = this.state.sections.map((section, i) => {
            console.log(section)
            return (
                <div className="card" key={i}>
                    <div className="card-body">
                        <input type='checkbox' value='on'/>
                        {section.t_title}
                        <br/>
                        {section.notes}
                    </div>
                </div>
            )
        })
        return (
            <div>
                {this.props.header}
                {displaySections}
            </div>
        )
    }
}

export default Tabs;