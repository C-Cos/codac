import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';

class CarouselContent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    
    render() {
        return (
            <div className="card">
                <div className="container-img-card">
                    <img className="card-img-top img-responsive" src={this.props.events.image} alt=""/>
                </div>
                <div className="card-body">
                    <h5 className="card-title font-weight-bold">{this.props.events.name}</h5>
                    <p className="card-text" style={{height:"100px"}}>{this.props.events.desc}</p>
                    <div style={{height:"30px"}}><FontAwesomeIcon className="mr-2" style={{fontSize: "17px"}} icon={ faClock }/><span style={{fontSize: "14px"}}> Du {this.props.events.start_date} au {this.props.events.end_date} </span></div>
                    <div style={{height:"40px"}}><FontAwesomeIcon className="mr-2" style={{fontSize: "20px"}} icon={ faMapMarkerAlt }/><span style={{fontSize: "14px"}}> {this.props.events.city}</span></div>
                   
                    <Link to={"/event/"+this.props.events._id} className="btn btn-dark">Détails</Link>
                </div>
            </div>
        );
    }
}

export default CarouselContent;