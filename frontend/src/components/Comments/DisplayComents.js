import React, {Component} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import jwt_decode from 'jwt-decode';

import './Comment.css';


export default class DisplayComments extends Component{

    constructor(props){
        super(props);
        this.Delete = this.Delete.bind(this);
        this.Edit = this.Edit.bind(this);
        this.onChangeNewComment = this.onChangeNewComment.bind(this);
        this.modify = this.modify.bind(this);

        this.state = {
            show: false,
            newComment: this.props.obj.description,
            date: '',
            hour: ''
        }
    }
    onChangeNewComment(e){
        this.setState({
            newComment: e.target.value
        })
    }
    Delete(e){
        e.preventDefault();
        if(window.confirm("Etes-vous sûr de vouloir supprimer votre commentaire ?"))
        {
            axios.delete('http://localhost:4242/comment', {data : {id: this.props.obj._id}})
            .then(response => {
                this.props.delete(this.props.var);
            })
            .catch(function(err){
                console.log(err);
            })
        }
    }
    Edit(e){
        e.preventDefault();
        this.setState({ show: true });
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
        // Date en STR
        var first = JSON.stringify(this.props.obj.created_date);

        // Split Hour and Date
        var sec =  first.split("T");
        
        // Date 
        var mydate = sec[0];
        var date = mydate.split('"');
        
        // Hour
        var time = sec[1];
        var thr = time.split('.');
        //console.log(thr[0]);

        this.setState({
            date: date[1],
            hour: thr[0]
        })
    }
    hideModal = () => {
        this.setState({ show: false });
    };
    modify(e){
        e.preventDefault();
        console.log("TEST");
        axios.put('http://localhost:4242/comment', {data : {id: this.props.obj._id, description: this.state.newComment}})
            .then(response => {
                console.log("ok");
                this.props.update(this.props.var, this.state.newComment);
            })
            .catch(function(err){
                console.log(err);
            })
        this.setState({ show: false });
    }



    render() {
        const controls = (
            <div>
                <button onClick = {this.Delete} style={{backgroundColor: "transparent", border: "none"}}>
                    <FontAwesomeIcon icon={faTrashAlt} style={{fontSize:"20px", color:"black", margin:"10px"}}/>
                </button>
                <button onClick = {this.Edit} style={{backgroundColor: "transparent", border: "none"}}>
                    <FontAwesomeIcon icon={faEdit} style={{fontSize:"20px", color:"black", margin:"10px"}}/>
                </button>
            </div>
        );
        return(
            <div className="container" style={{marginBottom: "30px"}}>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                        <p style={{textAlign: "center"}}>Modifiez votre commentaire</p>
                        <br/>
                        <div className="form-group">
                            <textarea name = "NewComment" value={this.state.newComment} onChange={this.onChangeNewComment}> </textarea>
                        </div>
                        <br/>
                        <button type="button" onClick={this.modify} className="btn btn-outline-dark edit" >Modifier</button>
                </Modal>
                <hr />
                <div className="row">
                    <div className="col infoTypo">
                        De : {this.props.obj.username}
                        <br/>
                        Le : {this.state.date}
                    </div>
                    <div className="col-8 ">
                        "{this.props.obj.description}"
                    </div>
                    <div className="col">
                        {this.props.obj.username === this.state.username ? controls : null}
                    </div>
                </div>
            </div>
        )
    }
}

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
            <button onClick={handleClose} className="exit">
                <FontAwesomeIcon icon={faTimes} style={{fontSize:"20px", color:"black", margin:"10px"}}/>
            </button>
            <div className="container">
                <div className="row">
                    <div className="col-2">
                    </div>
                    <div className="col-8">
                        {children}
                    </div>
                </div>
            </div>
        </section>
      </div>
    );
};