import React from 'react';

import Carousel from 'nuka-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareRight, faCaretSquareLeft } from '@fortawesome/free-solid-svg-icons'



export default class Home extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            //videoURL: "https://www.istockphoto.com/fr/vid%C3%A9o/athl%C3%A8tes-masculins-propulsant-un-cr%C3%A2ne-de-quad-sur-un-lac-avec-le-soleil-en-arri%C3%A8re-gm843060762-139582203"
            videoURL: 'https://media.gettyimages.com/videos/let-the-road-guide-me-when-im-running-video-id962123092'
            //videoURL: 'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4'
        }
    }
    render () {
        return (
            <div>
                <div className="mb-4" style={{width: '100%', height: '500px', overflow: 'hidden', position: "relative", zindex:0, display: "flex", justifyContent: "center", alignItems: "center"}}>
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
                        <p className="paragraphe" style={{textAlign: "center", color: "white", fontSize:"50px", textTransform: "uppercase", fontWeight: "bold", justifyContent: "center"}}>Lorem ipsum dolor sit amet 
                        </p>
                        <p  className="paragraphedeux" style={{textAlign: "center", color: "white", fontSize:"20px", justifyContent: "center"}}>Lorem ipsum dolor sit amet
                        </p>
                    </div>
                </div>

                <div className="title-event">
                    Evènements près de chez vous
                </div>
                <div className="carousel" style={{width:"100%"}}>
                    <Carousel 
                        renderCenterLeftControls={({ previousSlide }) => (
                            <button onClick={previousSlide} style={{backgroundColor: "transparent", border: "none"}}>
                                <FontAwesomeIcon id="carouselLeft" icon={faCaretSquareLeft} style={{fontSize:"40px", color:"black", paddingLeft: "10px"}}/>
                            </button>
                            )}
                        renderCenterRightControls={({ nextSlide }) => (
                            <button onClick={nextSlide} style={{backgroundColor: "transparent", border: "none"}}>
                                <FontAwesomeIcon id="carouselRight" icon={faCaretSquareRight} style={{fontSize:"40px", color:"black", paddingRight: "10px"}}/>
                            </button>
                            )}
                        autoplay={true}
                        wrapAround={true}
                        speed={400}
                        slidesToShow={4} 
                        cellSpacing={0}>
                        
                        <div className="card">
                            <div className="container-img-card">
                                <img className="card-img-top img-responsive" src="https://images.unsplash.com/photo-1537204760139-44e68c37bec8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="/" className="btn btn-dark">Go somewhere</a>
                            </div>
                        </div>
                        
                        
                        <div className="card">
                            <div className="container-img-card">
                                <img className="card-img-top" src="https://images.unsplash.com/photo-1540910728803-3ad8a6679702?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt=""/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="/" className="btn btn-dark">Go somewhere</a>
                            </div>
                        </div>
                        
                        <div className="card">
                            <div className="container-img-card">
                                <img className="card-img-top" src="https://images.unsplash.com/photo-1470468969717-61d5d54fd036?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=683&q=80" alt=""/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="/" className="btn btn-dark">Go somewhere</a>
                            </div>
                        </div>
                        
                        
                        <div className="card">
                            <div className="container-img-card">
                                <img className="card-img-top" src="https://images.unsplash.com/photo-1498484502070-2165cb42d504?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt=""/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="/" className="btn btn-dark">Go somewhere</a>
                            </div>
                        </div>
                        
                        
                        <div className="card">
                            <div className="container-img-card">
                                <img className="card-img-top" src="https://images.unsplash.com/photo-1552064578-5892872ab7c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="/" className="btn btn-dark">Go somewhere</a>
                            </div>
                        </div>
                        
                        <div className="card">
                            <div className="container-img-card">
                                <img className="card-img-top" src="https://images.unsplash.com/photo-1536007364907-ffbbce98e2d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt=""/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="/" className="btn btn-dark">Go somewhere</a>
                            </div>
                        </div>
                        
                    </Carousel>
                </div>
            </div>  
        )
    }
}