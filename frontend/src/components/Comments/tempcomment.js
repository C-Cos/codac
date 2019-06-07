import React, {Component} from 'react';
import axios from 'axios';

import TableComment from "./DisplayComents";

export default class Comments extends Component{

    constructor(props){
        super(props);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.updateList = this.updateList.bind(this);
        this.dynamicList = this.dynamicList.bind(this);
        this.addComment = this.addComment.bind(this);
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
        axios.get('http://localhost:4242/comment', {params : {idEvent: this.props.id}})
        .then(response => {
            this.setState({
                result: response.data
            })
        })
        .catch(function(err){
            console.log(err);
        })
    }

    onSubmit(e){
        e.preventDefault();
        var params = {
            idEvent: this.props.id,
            username: this.state.username,
            description: this.state.comment
        }
        axios.post('http://localhost:4242/comment', params)
        .then(response => {
            this.addComment(response.data);            
        })
        .catch(function(err){
            console.log(err);
        })

    }

    addComment(data){
        var newArray = [...this.state.result];    
        newArray.unshift(data);   
        this.setState({
            result : newArray
        })
        this.setState({
            comment: ''
        });
    }

    updateList(key){
        var array = [...this.state.result]; // make a separate copy of the arra
        if (key !== -1) {
          array.splice(key, 1);
          this.setState({result: array});
        }
    }

    tab(){
        let self = this;
        let nameUser = this.props.eventUsername
        //console.log(this.props.eventUsername);
        return this.state.result.map(function(object, i){
            return <TableComment obj={object} key={i} var={i} delete={self.updateList} update={self.dynamicList} NameUser = {nameUser} />;
        });
    }

    dynamicList(key, value){
        var array = [...this.state.result]
        array[key].description = value 
        this.setState({
            result: array
        })
    }

    render() {
        const inputComment = (
            <form onSubmit={this.onSubmit}>
                <div className="form-group comAjout">
                    <label>Entrez un commentaire : </label>
                    <br/>
                    <textarea rows = "3" name = "comment" value={this.state.comment} onChange={this.onChangeComment} required> </textarea>
                    <br/>
                </div>   
                <div className="form-group">
                    <input id="commentSubmit" type="submit" value="Ajouter" className="btn btn-dark"/>
                </div>
            </form>
        )
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        {localStorage.usertoken ? inputComment : null} 
                    </div>
                    {this.tab()}
                </div>
            </div>
        )
    }
}