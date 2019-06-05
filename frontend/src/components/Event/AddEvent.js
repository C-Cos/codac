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
// function mySplit(date){
//     //var str = JSON.stringify(date);
//     return date.split('-');
// }

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
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeZipcode = this.onChangeZipcode.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            nameEvent: "",
            descEvent: "",
            sport: "",
            address: "",
            zipcode: "",
            city:"",
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

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangeZipcode(e) {
        this.setState({
            zipcode: e.target.value
        });

        if (e.target.value.length === 5) {

            fetch('https://vicopo.selfbuild.fr/cherche/'+ this.state.zipcode,
                {
                    "method": "GET",
                
                })
            .then(response => response.json())
            .then(responseData => {
                this.setState({city : responseData.cities[0].city});
            
                })
            .catch(function(err) {
                alert("Aucun ville ne correspond à votre recherche");
                console.log(err);
            });
    }
    else
    {
        this.setState({city : ''});
    }
    }

    onChangeCity(e) {
        this.setState({
            city: e.target.value
        });
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
    // onChangeStartDate(e) {
    //     var newD = mySplit(e.target.value);
    //     var start = mySplit(this.state.startDate);
    //     if (newD[0] >= start[0]) {
    //         if(newD[1] > start[1]) {
    //             if(newD[2] <= start[2] || newD[2] === start[2] || newD[2] >= start[2]) {
    //                 this.setState({
    //                     startDate : e.target.value
    //                 });
    //             }
    //             else {
    //                 alert("Votre évènement ne peut pas commencer avant aujourd'hui.")
    //                 this.setState({
    //                     startDate : myDate()
    //                 });
    //             }   
    //         }
    //         else if(newD[1] === start[1]) {
    //             if(newD[2] >= start[2]) {
    //                 this.setState({
    //                     startDate : e.target.value
    //                 });
    //             } 
    //             else {
    //                 alert("Votre évènement ne peut pas commencer avant aujourd'hui.")
    //                 this.setState({
    //                     startDate : myDate()
    //                 });
    //             }    
    //         }
    //         else  {
    //             alert("Votre évènement ne peut pas commencer avant aujourd'hui.")
    //             this.setState({
    //                 startDate : myDate()
    //             });
    //         }
    //     }
    //     else  {
    //         alert("Votre évènement ne peut pas commencer avant aujourd'hui.")
    //         this.setState({
    //             startDate : myDate()
    //         });
    //     }
    // }

    // onChangeEndDate(e) {
    //     var newD = mySplit(e.target.value);
    //     var start = mySplit(this.state.startDate);
    //     if (newD[0] >= start[0]) {
    //         if(newD[1] > start[1]) {
    //             if(newD[2] <= start[2] || newD[2] === start[2] || newD[2] >= start[2]) {
    //                 this.setState({
    //                     endDate : e.target.value
    //                 });
    //             }
    //             else {
    //                 alert("La date de fin de l'évènement ne peut pas être inférieure à la date de départ.")
    //                 this.setState({
    //                     endDate : myDate()
    //                 });
    //             }   
    //         }
    //         else if(newD[1] === start[1]) {
    //             if(newD[2] >= start[2]) {
    //                 this.setState({
    //                     endDate : e.target.value
    //                 });
    //             } 
    //             else {
    //                 alert("La date de fin de l'évènement ne peut pas être inférieure à la date de départ.")
    //                 this.setState({
    //                     endDate : myDate()
    //                 });
    //             }    
    //         }
    //         else  {
    //             alert("La date de fin de l'évènement ne peut pas être inférieure à la date de départ.")
    //             this.setState({
    //                 endDate : myDate()
    //             });
    //         }
    //     }
    //     else  {
    //         alert("La date de fin de l'évènement ne peut pas être inférieure à la date de départ.")
    //         this.setState({
    //             endDate : myDate()
    //         });
    //     }
        
    // }
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
    componentDidMount(){
        if(localStorage.usertoken===undefined) {
            this.props.history.push("/");
        };

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
        data.append('address', this.state.address);
        data.append('zipcode', this.state.zipcode);
        data.append('city', this.state.city);
        
        axios.post('http://localhost:4242/events/addevent', data)
        .then((response) => {
            console.log(response); 
            this.setState({
                fireRedirect: true
            });   
               
        })
        .catch((error) => {
            console.log(error);

        });
    }
      render() {
        return (
        <div className="traitnoir">
            <div className="container formregister" style={{paddingTop: 30, width: 700, paddingBottom: 60}}>
                <h3 style={{marginTop: 30, textAlign: "center"}} >Créer un évènement :</h3><br/>
                <div style={{marginTop: 30}}>
                    <form onSubmit={this.onSubmit}>
                           <div className="form-group">
                            <label for="orgaName"> Nom de l'organisateur : </label>
                            <input className="form-control" name="asso" value={this.state.username} id="orgaName" disabled />
                        </div>
                        <div className="form-group">
                            <label for="nameEvent">Nom de l'évènement :  </label>
                            <input id="nameEvent" type="text" className="form-control" minLength="3" maxLength="20" value={this.state.nameEvent} onChange={this.onChangeNameEvent} required/>
                        </div>
                        <div className="form-group">
                            <label for="descEvent">Description de l'évènement : </label>
                            <textarea id="descEvent" rows="2" className="form-control" value={this.state.descEvent} onChange={this.onChangedescEvent}></textarea>
                        </div>
                        <div className="form-group">
                            <label>Adresse :  </label>
                            <input type="text" className="form-control" autoComplete="nope" value={this.state.address} onChange={this.onChangeAddress} required/>
                        </div>
                        <div className="form-group">
                            <label>Code postal: </label>
                            <input type="text" maxLength="5" className="form-control" autoComplete="nope" value={this.state.zipcode} onChange={this.onChangeZipcode} required/>                       
                        </div>
                        <div className="form-group">
                            <label>Ville : </label>
                            <input type="text" className="form-control" value={this.state.city} onChange={this.onChangeCity} required/>
                        </div>
                        <div class="form-row inputdate">
                            <div class="form-group col-md-6">
                                <label for="startDate">Date de début:</label>
                                <input type="date" class="form-control" id="startDate" name="startDate"
                                    defaultValue={myDate()}
                                    onChange={this.onChangeStartDate}
                                    min={myDate()}
                                    required
                                />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="endDate">Date de fin:</label>
                                <input type="date" class="form-control" id="endDate" name="endDate"
                                    defaultValue={this.state.startDate}
                                    onChange={this.onChangeEndDate}
                                    min={this.state.startDate}
                                    required/>
                            </div>
                        </div>
                        <div class="form-row inputheure">
                            <div class="form-group col-md-6">
                                <label for="HrStart">Heure de début:</label>
                                <input type="time" class="form-control" id="HrStart" name="HrStart"
                                 value={this.state.HourStart} onChange={this.onChangeHrStart} required
                                />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="HrEnd">Heure de fin:</label>
                                <input type="time" class="form-control" id="HrEnd" name="HrEnd"
                                 value= {this.state.HourEnd} onChange={this.onChangeHrEnd} required/>
                            </div>
                        </div>
                        <br/>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <Select value={this.state.sport} onChangeSport={this.onChangeSport}></Select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="imgUpload">Image:</label>
                                <input id="imgUpload" class="form-control-file" type="file" onChange={this.onChangeImage}
                                />
                            </div>
                        </div>
                        <br/>

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