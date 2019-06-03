import React, {Component} from 'react';
import axios from 'axios';
import './Comment.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'


export default class DisplayComments extends Component{

    constructor(props){
        super(props);
        this.Delete = this.Delete.bind(this);
        this.Edit = this.Edit.bind(this);
        this.onChangeNewComment = this.onChangeNewComment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

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
        var first = JSON.stringify(this.props.obj.created_date);
        var sec =  first.split("T");
        console.log(sec[0]);
        var time = sec[1];
        var thr = time.split('.');
        console.log(thr[0]);
        this.setState({
            date: sec[0],
            hour: thr[0]
        })
    }
    hideModal = () => {
        this.setState({ show: false });
    };
    onSubmit(e){
        e.preventDefault();
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
        return(
            <div className="container" style={{marginBottom: "30px"}}>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <form onSubmit={this.onSubmit} style={{textAlign: "center"}}>
                        <p style={{textAlign: "center"}}>Modifiez votre commentaire</p>
                        <br/>
                        <div className="form-group">
                            <textarea name = "NewComment" value={this.state.newComment} onChange={this.onChangeNewComment}> </textarea>
                        </div>
                        <br/>
                        <button type="button" className="btn btn-outline-dark edit" >Modifier</button>
                    </form>
                </Modal>
                <hr />
                <div className="row">
                    <div className="col">
                        De : {this.props.obj.username}
                        <br/>
                        Posté le : {this.state.date}
                        <br/>
                        A : {this.state.hour}
                    </div>
                    <div className="col-9">
                        "{this.props.obj.description}"
                    </div>
                    <div className="col">
                        <button onClick = {this.Delete} style={{backgroundColor: "transparent", border: "none"}}>
                            <FontAwesomeIcon icon={faTrashAlt} style={{fontSize:"20px", color:"black", margin:"10px"}}/>
                        </button>
                        <button onClick = {this.Edit} style={{backgroundColor: "transparent", border: "none"}}>
                            <FontAwesomeIcon icon={faEdit} style={{fontSize:"20px", color:"black", margin:"10px"}}/>
                        </button>
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