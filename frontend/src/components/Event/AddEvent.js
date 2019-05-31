import React from 'react';
import { Redirect } from 'react-router';
import jwt_decode from 'jwt-decode';
import Select from "./SelectSport";
import axios from 'axios';

function myDate(){
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var strM = JSON.stringify(month);
    var strD = JSON.stringify(date);
    if(strM.length < 2 && strD.length < 2)
    {
        return (year + "-0" + month + "-0" + date);
    }
    else if(strD.length < 2)
    {
        return(year + "-" + month + "-0" + date);
    }
    else if(strM.length < 2)
    {
        return(year + "-0" + month + "-" + date);
    }
    else
    {
        return(year + "-" + month + "-" + date);
    }
}

function myHour(){
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var strH = JSON.stringify(hours);
    var strM = JSON.stringify(min);
    if(strH < 2 && strM <2)
    {
        return ("0" + hours + ":0" + min)
    }
    else if(strH < 2)
    {
        return ("0" + hours + ":" + min)
    }
    else if(strM < 2)
    {
        return (hours + ":0" + min)
    }
    else
    {
        return (hours + ":" + min)
    }
}

export default class AddEvent extends React.Component {
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
            file: null
        }

    }

    onChangeImage(e) {
        this.setState({
            file: e.target.files[0]
        })
    }

    onChangeEndDate(e) {
        this.setState({
            endDate : e.target.value
        });
    }
    onChangeStartDate(e) {
        this.setState({
            startDate : e.target.value
        });
    }
    onChangeHrEnd(e) {
        this.setState({
            HourEnd: e.target.value
        });
    }
    onChangeHrStart(e) {
        this.setState({
            HourStart: e.target.value
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
    componentDidMount(){
        const token = localStorage.usertoken;
        if(!token){
            this.props.history.push('/login')
        }
        else {
            const decoded = jwt_decode(token);
            this.setState({
                username : decoded.username,
            })
        }
        this.setState({
            endDate: myDate()
        })
        this.setState({
            startDate: myDate()
        })
        this.setState({
            HourEnd: myHour()
        })
        this.setState({
            HourStart: myHour()
        })
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

        // const newEvent = {
        //     username: this.state.username,
        //     name: this.state.nameEvent,
        //     desc: this.state.descEvent,
        //     sport: this.state.sport,
        //     startDate: this.state.startDate,
        //     endDate: this.state.endDate,
        //     startHr: this.state.HourStart,
        //     endHr: this.state.HourEnd,
        // }

        // console.log(newEvent);
        
        axios.post('http://localhost:4242/events/addevent', data)
        .then((response) => {
            console.log("OK");    
               
        })
        .catch((error) => {
            console.error("Failed");
        });
    }



      render() {
        return (
            <div className="container formregister" style={{paddingTop: 30, width: "40%", paddingBottom: 60}}>
                <h3 style={{marginTop: 30, textAlign: "center"}} >Créer un évènement :</h3>
                <div style={{marginTop: 50}}>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label> Nom de l'organisateur : </label>
                            <input className="form-control" name="asso" value={this.state.username} id="orgaName" disabled />
                        </div>
                        <div className="form-group">
                            <label>Nom de l'évènement :  </label>
                            <input id="nameEvent" type="text" className="form-control" value={this.state.nameEvent} onChange={this.onChangeNameEvent} required/>
                        </div>
                        <div className="form-group">
                            <label>Description de l'évènement : </label>
                            <input id="descEvent" type="textarea" className="form-control" value={this.state.descEvent} onChange={this.onChangedescEvent} required/>
                        </div>
                        <div className="form-group">
                            <label>Image :  </label>
                            <input type="file" className="form-control" onChange={this.onChangeImage}/>
                        </div>
                        <div className="form-group">
                            <label>Date de début: </label>
                            <br/>
                            <input type="date" id="startDate" name="startDate"
                                value={this.state.startDate}
                                onChange={this.onChangeStartDate}
                                required
                                ></input>
                            <br/>
                            <label>Heure de début: </label>
                            <br/>
                            <input type="time" id="HrStart" name="HrStart"
                                value={this.state.HourStart} onChange={this.onChangeHrStart} required></input>
                        </div>
                        <div className="form-group">
                            <label>Date de Fin: </label>
                            <br/>
                            <input type="date" id="endDate" name="endDate"
                                value={this.state.endDate}
                                onChange={this.onChangeEndDate}
                                required
                                ></input>
                            <br/>
                            <label>Heure de Fin: </label>
                            <br/>
                            <input type="time" id="HrEnd" name="HrEnd"
                               value= {this.state.HourEnd} onChange={this.onChangeHrEnd} required></input>
                        </div>
                        <div>
                            <Select value={this.state.sport} onChangeSport={this.onChangeSport}></Select>
                        </div>
                        
                        <div className="form-group">
                            <input id="SubmitRegister" type="submit" value="Enregistrer" className="btn btn-dark"/>
                        </div>
                    </form>
                </div>
                {this.state.fireRedirect && <Redirect to='/login' push={true} />}
            </div>
        )
    }
}