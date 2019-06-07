import React from 'react';
import { Redirect } from 'react-router';
//import jwt_decode from 'jwt-decode';
import Select from "./SelectSport";
import axios from 'axios';

export default class EditEvent extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onChangeNameEvent = this.onChangeNameEvent.bind(this);
        this.onChangedescEvent = this.onChangedescEvent.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeHrStart = this.onChangeHrStart.bind(this);
        this.onChangeHrEnd = this.onChangeHrEnd.bind(this);
        this.onChangeSport = this.onChangeSport.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            eventid: "",
            username: "",
            nameEvent: "",
            descEvent: "",
            sport: "",
            HourEnd: "",
            HourStart: "",
            startDate: "",
            endDate: "",
            fulldate: "",
            curdate: "",
            curHour:"",
            file: null,
            image: ""
        }

    }

    componentDidMount(){

        const token = localStorage.usertoken;
        if(!token){
            this.props.history.push('/login')
        }

        let eventid = this.props.location.pathname.split('/')[2];

        axios.get('http://localhost:4242/event/'+eventid)
            .then(response => {
                this.setState({
                    eventid: eventid,
                    username: response.data.username,
                    nameEvent: response.data.name,
                    descEvent: response.data.desc,
                    sport: response.data.category,
                    HourEnd: response.data.end_time,
                    HourStart: response.data.start_time,
                    startDate: response.data.start_date,
                    endDate: response.data.end_date,
                    image: response.data.image
                });   
            })
            .catch(function(error){
                console.log(error);
        })      
    }

    onChangeImage(e) {
        this.setState({
            file: e.target.files[0]
        })
    }

    onChangeStartDate(e) {
        this.setState({
            startDate : e.target.value
        });
    }

    onChangeEndDate(e) {
        this.setState({
            endDate: e.target.value
        });
    }
    
    onChangeHrStart(e) {
        this.setState({
            HourStart: e.target.value
        });
    }
    onChangeHrEnd(e) {
        this.setState({
            HourEnd: e.target.value
        });
    }
    onChangeNameEvent(e) {
        this.setState({
            nameEvent: e.target.value
        });
    }
    onChangedescEvent(e) {
        this.setState({
            descEvent: e.target.value
        });
    }
    onChangeSport(e) {
        this.setState({
            sport: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const data = new FormData();

        data.append('file', this.state.file);
        data.append('username', this.state.username);
        data.append('name', this.state.nameEvent);
        data.append('desc', this.state.descEvent);
        data.append('sport', this.state.sport);
        data.append('startDate', this.state.startDate);
        data.append('endDate', this.state.endDate);
        data.append('startHr', this.state.HourStart);
        data.append('endHr', this.state.HourEnd);
        data.append('image',this.state.image);
        
        axios.put('http://localhost:4242/event/'+this.state.eventid, data)
        .then((response) => {
            this.props.history.push("/events");              
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
      render() {
        return (
        <div className="traitnoir">
            <div className="container formregister" style={{paddingTop: 30, width: 400, paddingBottom: 60}}>
                <h3 style={{marginTop: 30, textAlign: "center"}} >Editer un évènement :</h3><br/>
                <div style={{marginTop: 50}}>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label> Nom de l'organisateur : </label>
                            <input className="form-control" name="asso" defaultValue={this.state.username} id="orgaName" disabled />
                        </div>
                        <div className="form-group">
                            <label>Nom de l'évènement :  </label>
                            <input id="nameEvent" type="text" className="form-control" minLength="3" maxLength="100" defaultValue={this.state.nameEvent} onChange={this.onChangeNameEvent} required/>
                        </div>
                        <div className="form-group">
                            <label>Description de l'évènement : </label>
                            <input id="descEvent" min="100" max="1000" type="textarea" className="form-control" defaultValue={this.state.descEvent} onChange={this.onChangedescEvent} required/>
                        </div>
                        <div className="form-group">
                            <label>Image :  </label>
                            <input type="text" className="form-control" defaultValue={this.state.image} disabled/>
                            <input type="file" className="form-control" onChange={this.onChangeImage}/>
                        </div>
                        <div className="form-group inputdate"  style={{display: 'flex', height: 80 }}>
                            
                            <div>
                             <label>Date de début: </label>
                             <br/>
                             <input type="date" id="startDate" name="startDate"
                                defaultValue={this.state.startDate}
                                onChange={this.onChangeStartDate}
                                min={this.state.startDate}
                                required
                            ></input>
                            </div>

                            <div>
                               <label>Date de fin: </label>
                               <br/>
                              <input type="date" id="endDate" name="endDate"
                                    defaultValue={this.state.endDate}
                                    onChange={this.onChangeEndDate}
                                    min={this.state.startDate}
                                    required
                                   ></input>
                            </div>
                        </div>


                        <div className="form-group inputheure"  style={{display: 'flex', height: 80 }}>
                            <div>
                            <label>Heure de début: </label>
                               <br/>
                              <input type="time" id="HrStart" name="HrStart"
                                  defaultValue={this.state.HourStart} onChange={this.onChangeHrStart} required></input>
                            </div>
                            <div>
                              <label>Heure de Fin: </label>
                                 <br/>
                                 <input type="time" id="HrEnd" name="HrEnd"
                                 defaultValue= {this.state.HourEnd} onChange={this.onChangeHrEnd} required></input>
                            </div> 
                        </div>


                        <div className="categorie">
                            <Select value={this.state.value} onChangeSport={this.onChangeSport}></Select>
                        </div>
                        <br/><br/>

                        <div className="form-group" style={{ textAlign: 'center',  }}>
                            <input id="SubmitRegister" type="submit" value="Enregistrer" className="btn btn-dark" style={{width: 150}}/>
                        </div>

                    </form>
                </div>
                {this.state.fireRedirect && <Redirect to='/events' push={true} />}
            </div>
        </div>
        )
    }
}