import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import jwt_decode from 'jwt-decode';
//import Select from 'react-select';

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
            curHour:""
        }
    }
    onChangeEndDate(e) {
        this.setState({
            endDate : this.state.curdate
        });
    }
    onChangeStartDate(e) {
        this.setState({
            startDate : this.state.curdate
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
    onChangeHrEnd(e) {
        this.setState({
            HourEnd: this.state.curHour
        });
    }
    onChangeHrStart(e) {
        this.setState({
            HourStart: this.state.curHour
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
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        this.setState({ curdate: year + "-0" + month + "-" + date});

        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        console.log(hours);
        console.log(min);
        var test = hours + ":" + min;
        console.log(test);
        this.setState({ curHour: hours + ":" + min });
        //console.log(this.state.curHour);
    }

    onSubmit(e) {
        e.preventDefault();
        
        const newEvent = {
        }
        axios.post('http://localhost:4242/article/add', newEvent)
        .then((response) => {
            console.log(response.data)
            if(response.data.message === "Successful")
            {
                this.setState({
                    wrong: '',
                    fireRedirect: true
                });
            }
            else
            {
                this.setState({
                    wrong: response.data.message
                });
                console.log(response.data);
            }
        })
        .catch((error) => {
            console.error(error);
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
                            <label>Date de début: </label>
                            <br/>
                            <input type="date" id="startDate" name="startDate"
                                value= {this.state.curdate}
                                min="2019-01-01" max="2019-12-31"
                                onChange={this.onChangeStartDate}
                                ></input>
                            <br/>
                            <label>Heure de début: </label>
                            <br/>
                            <input type="time" id="HrStart" name="HrStart"
                                min="5:00" max="22:00" value={this.state.HourStart} required onChange={this.onChangeHrStart}></input>
                        </div>
                        <div className="form-group">
                            <label>Date de Fin: </label>
                            <br/>
                            <input type="date" id="endDate" name="endDate"
                                value={this.state.curdate}
                                onChange={this.onChangeEndDate}
                                ></input>
                            <br/>
                            <label>Heure de Fin: </label>
                            <br/>
                            <input type="time" id="HrEnd" name="HrEnd"
                                min="5:00" max="22:00" value= {this.state.HourEnd} onChange={this.onChangeHrEnd}></input>
                        </div>
                        <div className="form-group">
                            <label>Choisir la category "Sport" de l'évènement : </label>
                            <select
                                option= "vallue 1"
                                value={this.state.sport}
                                autosize
                                onChange={this.onChangeSport}
                                placeholder="Select Values"
                            />
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