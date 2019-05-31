import React from 'react';
import axios from 'axios';

export default class SelectSport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sports: [],
        }
    }

    componentDidMount(){
        axios.get('http://localhost:4242/category')
        .then((response) => {
            //console.log(response.data);
            this.setState({sports: response.data});
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    render(){
        return(
            <div className="form-group">
                <label>Choisir la category "Sport" de l'évènement : </label>
                <br/>
                <select value={this.props.value} onChange={this.props.onChangeSport}>
                    <option value="null"> Sélectionner un sport </option>
                    {this.state.sports.map(function(opt){
                        return <option key={opt._id}
                        value={opt.name}>{opt.name}</option>;
                        })
                    }
                </select>
            </div>

        )
    }
}