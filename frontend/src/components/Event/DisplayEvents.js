import React, {Component} from 'react';
import axios from 'axios';
import EventContent from './EventContent';

export default class DisplayEvents extends Component{

    constructor(props){
        
        super(props);
        this.state = {events: []};

    }

    componentDidMount(){
        
        axios.get('http://localhost:4242/getevents/'
        .then(response => {
            this.setState({events: response.data});

        })
        .catch(function(error){
            console.log(error);
        })
           
    }

    render() {
        return(
            <div className="jumbotron">
                <h3 className="welcomehome mb-5 text-center">Events</h3>
                <hr />
                    <div class="row">
                    {
                            this.state.events.map(function(currentEvent, i){
                                return(<EventContent events={currentEvent} key={i} />)
                            })
                        }

                    </div>
            </div>
        )
    }

}