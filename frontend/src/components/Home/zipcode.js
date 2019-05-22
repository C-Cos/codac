import React from 'react';
import Textarea from './Textarea';
require('vicopo');

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            description: '',
            city: '',
        }
       
    }
    
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });

        if (e.target.value.length === 5) {
            
            let zipcode = this.state.description;
        
            fetch('https://vicopo.selfbuild.fr/cherche/'+ zipcode,
            {
                "method": "GET",
                
            })
            .then(response => response.json())
            .then(responseData => {
            this.setState({city : responseData.cities[0].city});
            
            }).catch(function() {
                console.log("no city found");
            });
            

        }else{
            this.setState({city : ''});
        }
    }


    onSubmit(e) {
        
    }


    render(){
        return (
            <div className="container">
                
                <div style={{marginTop: 50, marginLeft: 300, marginRight:300}}>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Code postal: </label>
                            
                            <Textarea value={this.state.description} onChangeDescription={this.onChangeDescription}/>
                            
                            <input className="form-control mt-3" value={this.state.city}/>
                        
                        </div>
                        <div id="textarea_feedback"></div>
                        
                        <div className="form-group">
                            <input type="submit" value="Valider" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}