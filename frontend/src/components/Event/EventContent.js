import React, { Component } from 'react';


class EventContent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    
    render() {
        return (
            <div className="col-md-4 mb-3">
                <div className="card p-3">
                    <div className="p-3">
                        <img src={this.props.events.username} className="card-img-top mr-3" alt="..."/>
                    </div>
                    <div className="">
                        <div className="usercardname mb-2">{this.props.events.name}</div>
                        <div>{this.props.events.desc}</div>
                        <div>{this.props.events.start_date}</div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default EventContent;