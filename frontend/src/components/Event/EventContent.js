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
                    <div>
                        <img style={{height: 150, width:"auto"}} src={"http://localhost:4242"+this.props.events.image} className="card-img-top mr-3" alt={this.props.events.name}/>
                    </div>
                    <div className="">
                        <div className="usercardname mb-2 mt-4 p-2 font-weight-bold">{this.props.events.name}</div>
                        <hr />
                        <div>{this.props.events.desc}</div>
                        <div>Début : {this.props.events.start_date} à {this.props.events.start_time}</div>
                        <div>Fin : {this.props.events.end_date} à {this.props.events.end_time}</div>
                        <Link to={"/event/"+this.props.events._id} className="btn btn-warning text-white mt-4">En savoir plus</Link>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default EventContent;