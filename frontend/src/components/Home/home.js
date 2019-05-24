import React from 'react';
import pic1 from "../../img/kristopher-roller-188180-unsplash.jpg";
import pic2 from "../../img/danielle-macinnes-222441-unsplash.jpg";
import pic3 from "../../img/eric-muhr-643638-unsplash.jpg";

import Carousel from 'nuka-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareRight, faCaretSquareLeft } from '@fortawesome/free-solid-svg-icons'



export default class Home extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            //videoURL: "https://www.istockphoto.com/fr/vid%C3%A9o/athl%C3%A8tes-masculins-propulsant-un-cr%C3%A2ne-de-quad-sur-un-lac-avec-le-soleil-en-arri%C3%A8re-gm843060762-139582203"
            //videoURL: "../../run.mp4"
            videoURL: 'https://media.gettyimages.com/videos/let-the-road-guide-me-when-im-running-video-id962123092'
            //videoURL: 'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4'
        }
    }
    render () {
        return (
            <div>
                <div className="mb-4 mt-4" style={{width: '100%', height: '500px', overflow: 'hidden', position: "relative", zindex:0, display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <video id="background-video" loop autoPlay style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%'
                        }}>
                        <source src={this.state.videoURL} type="video/mp4" />
                        <source src={this.state.videoURL} type="video/ogg" />
                        Your browser does not support the video tag.
                    </video>
                    <div style={{width: '70%', height: "20%", position: "absolute", justifyContent: "center"}}>
                        <p style={{textAlign: "center", color: "white", fontSize:"50px", textTransform: "uppercase", fontWeight: "bold", justifyContent: "center"}}>Lorem ipsum dolor sit amet. 
                        </p>
                        <p style={{textAlign: "center", color: "white", fontSize:"20px", justifyContent: "center"}}>Lorem ipsum dolor sit amet. 
                        </p>
                    </div>
                </div>
                <div style={{width:"100%", height: '450px'}}>
                    <Carousel 
                        renderCenterLeftControls={({ previousSlide }) => (
                            <button onClick={previousSlide} style={{backgroundColor: "transparent", border: "none"}}>
                                <FontAwesomeIcon icon={faCaretSquareLeft} style={{fontSize:"40px", color:"black", paddingLeft: "10px"}}/>
                            </button>
                            )}
                        renderCenterRightControls={({ nextSlide }) => (
                            <button onClick={nextSlide} style={{backgroundColor: "transparent", border: "none"}}>
                                <FontAwesomeIcon icon={faCaretSquareRight} style={{fontSize:"40px", color:"black", paddingRight: "10px"}}/>
                            </button>
                            )}
                        autoplay={true}
                        wrapAround={true}
                        speed={400}
                        slidesToShow={4} 
                        cellSpacing={0}>
                        <div className="card">
                            <img className="card-img-top" src={pic1} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card-img-top" src={pic2} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card-img-top" src={pic3} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card-img-top" src={pic1} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card-img-top" src={pic2} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card-img-top" src={pic3} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card-img-top" src={pic1} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card-img-top" src={pic2} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </Carousel>
                </div>
            </div>  
        )
    }
}