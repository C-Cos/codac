import React, {Component} from 'react';
import axios from 'axios';
import EventContent from './EventContent';

export default class DisplayEvents extends Component{

    constructor(props){
        
        super(props);
        this.state = {events: []};

    }

    componentDidMount(){
        
        axios.get('http://localhost:4242/events/findAll')
        .then(response => {
            console.log(response.data.events);
            this.setState({events: response.data.events});
            

        })
        .catch(function(err){
            console.log(err);
        })
           
    }

    render() {
        return(
            <div className="jumbotron">
                <h3 className="welcomehome mb-5 text-center">Liste des évènements</h3>
                <hr />
                    {  
                            this.state.events.map(function(currentEvent, i){
                                return(<EventContent events={currentEvent} key={i} />)
                            })   
                    }
            </div>
        )
    }

}