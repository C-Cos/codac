import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

export default class DisplayOneEvent extends Component {

    constructor(props){
        
        super(props);
        this.state = {
            event: [],

        };

    }

    componentDidMount(){

        axios.get('http://localhost:4242/event/'+this.props.match.params.id)
            .then(response => {
                this.setState({event: response.data});     
            })
            .catch(function(error){
                console.log(error);
        })
        
    }

    render() {
        return (
            <div className="jumbotron mt-3">
                <div className="card mb-3 p-4">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src="" className="card-image" width="300" height="300" alt="event" />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h2 className="card-title">{this.state.event.username}</h2>
                                <p className="card-text">{this.state.event.name}</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}