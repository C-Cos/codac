import React, {Component} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import TableComment from "./DisplayComents";

export default class Comments extends Component{

    constructor(props){
        
        super(props);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.updateList = this.updateList.bind(this);
        this.dynamicList = this.dynamicList.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username:'',
            result: [],
            comment: "",
        };

    }

    onChangeComment(e) {
        this.setState({
            comment: e.target.value
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
        axios.get('http://localhost:4242/comment', {params : {idEvent: "5cf165edd19835214b4658dd"}})  //this.props.match.params.id
        .then(response => {
            //console.log(response.data);
            this.setState({
                result: response.data
            })
        })
        .catch(function(err){
            console.log(err);
        })
    }

    onSubmit(){
        var params = {
            idEvent: "5cf165edd19835214b4658dd",  //this.props.match.params.id
            username: this.state.username,
            description: this.state.comment
        }
        axios.post('http://localhost:4242/comment', params)
        .then(response => {
            console.log("added ok");
        })
        .catch(function(err){
            console.log(err);
        })
    }

    tab(){
        let self = this;
        return this.state.result.map(function(object, i){
            return <TableComment obj={object} key={i} var={i} delete={self.updateList} update={self.dynamicList}/>;
        });
    }

    updateList(key){
        //console.log(this.state.result)
        var array = [...this.state.result]; // make a separate copy of the arra
        if (key !== -1) {
          array.splice(key, 1);
          this.setState({result: array});
        } 
    }

    dynamicList(key, value){
        var array = [...this.state.result]
        array[key].description = value 
        //console.log(array[key]);
        this.setState({
            result: array
        })
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                    </div>
                        <div className="col">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Entrez un commentaire : </label>
                                    <br/>
                                    <textarea rows = "5" cols = "70" name = "comment" value={this.state.comment} onChange={this.onChangeComment} required> </textarea>
                                    <br/>
                                </div>   
                                <div className="form-group">
                                    <input id="commentSubmit" type="submit" value="Ajouter" className="btn btn-dark"/>
                                </div>
                            </form>
                        </div>
                    <div className="col">
                    </div>
                    {this.tab()}
                </div>
            </div>
        )
    }
}