import React from 'react';
import axios from 'axios';

export default class SelectSport extends React.Component {

    componentDidMount(){
        axios.get('http://localhost:4242/category')
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    
    render(){
        return(
            <div className="form-group">
                <label>Choisir la category "Sport" de l'évènement : </label>
                <select>
                    <option value="select">Selectionner un sport</option>
                </select>
            </div>

        )
    }
}