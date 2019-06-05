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
            <div className="card p-3">
                <div className="row">
                    <div className="col-lg-4 mb4" >
                        <img style={{height: 210, width:"auto", marginTop:"40px"}} src={this.props.events.image} className="card-img-top mr-3" alt={this.props.events.name}/>

                    </div>
                    <div className="col-lg-8 mb8">
                        <div className="usercardname mb-2 mt-4 p-2 font-weight-bold">{this.props.events.name}</div>
                        <hr />
                        <div>{this.props.events.desc}</div>

                        <div className="usercardname mb-2 mt-4 p-2" style={{fontSize:"15px", color:"#3b3083"}}>
                        <div>Début : {this.props.events.start_date} à {this.props.events.start_time}</div>
                        <div>Fin : {this.props.events.end_date} à {this.props.events.end_time}</div>
                        </div>
                        <Link to={"/event/"+this.props.events._id} className="btn btn-warning text-white mt-4">En savoir plus</Link>
                        
                    </div>
                </div>  
            </div>
        );
    }
}

export default EventContent;