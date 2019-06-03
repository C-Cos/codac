import React, { Component } from 'react';
import {Link} from "react-router-dom";

class EventContent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    
    render() {
        return (
            <div className="col-lg-12 mb-3">
                <div className="card p-3">
                <div className="row">
                    <div className="col-lg-3 mb3">
                        <img style={{height: 150, width:"auto",marginTop:"40px"}} src="https://images.unsplash.com/photo-1557766131-dca3a8acae87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1491&q=80" className="card-img-top mr-3" alt="..."/>
                    </div>
                    <div className="col-lg-9 mb9">
                        <div className="usercardname mb-2 mt-4 p-2 font-weight-bold">{this.props.events.name}</div>
                        <hr />
                        <div>{this.props.events.desc}</div>
                        <div>Début : {this.props.events.start_date} à {this.props.events.start_time}</div>
                        <div>Fin : {this.props.events.end_date} à {this.props.events.end_time}</div>
                        <Link to={"/event/"+this.props.events._id} className="btn btn-warning text-white mt-4">En savoir plus</Link>
                    </div>
                    
                </div>
                </div>

            </div>
        );
    }
}

export default EventContent;