import React, {Component} from 'react';
import axios from 'axios';
import '../Profile/Profile.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export default class DisplayOneEvent extends Component {

    constructor(props){
        
        super(props);
        this.state = {
            event: [],
            lon:2.363152, 
            lat:48.815580,
        };

    }

    componentDidMount(){

        axios.get('http://localhost:4242/event/'+this.props.match.params.id)
            .then(response => {
                // response.data.address = (response.data.address).replace(' ','+');
                // response.data.city = (response.data.city).replace(' ','+');
                this.setState({event: response.data});
                console.log((this.state.event.address).replace(' ','+'));     
            })
            .catch(function(error){
                console.log(error);
        })


        fetch('https://nominatim.openstreetmap.org/search?q='+(this.state.event.address)+',+'+(this.state.event.city)+'&format=json',
                    {
                        "method": "GET",
                    
                    })
                .then(response => response.json())
                .then(responseData => {
                    //this.setState({city : responseData.cities[0].city});
                    console.log(responseData);
                    console.log(responseData[0].lon);
                    this.setState({lon : responseData[0].lon});
                    this.setState({lat : responseData[0].lat});
                })

                .catch(function(err) {
                    //alert("Aucun ville ne correspond à votre recherche");
                    console.log(err);
                });
        
    }

    render() {
        const position = [this.state.lat, this.state.lon]
        return (
            <div className="jumbotron mt-3">
                <div className="card mb-3 p-4">
                    <div className="row">
                        <div className="col-md-4">
                            <img style={{height: 150, width:"auto"}} src="https://images.unsplash.com/photo-1557766131-dca3a8acae87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1491&q=80" className="card-image" width="300" height="300" alt="event" />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h2 className="card-title">{this.state.event.name}</h2>
                                <p className="card-text">{this.state.event.username}</p>
                                <p className="card-text">{this.state.event.desc}</p>
                                <p className="card-text">{this.state.event.address}</p>
                                <p className="card-text">{this.state.event.zipcode}</p>
                                <p className="card-text">{this.state.event.city}</p>
                                <button type="button" class="btn btn-primary mr-3">Soutenir</button><button type="button" class="btn btn-success">Participer</button>
                            </div>
                        </div>
                    </div>
                    <Map style={{width:'100%',height: '500px'}} center={position} zoom={this.state.zoom}>
                        <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                        <Marker position={position}>
                        <Popup>
                            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
                        </Popup>
                        </Marker>
                    </Map>
                </div>
            </div>
        )
    }
}