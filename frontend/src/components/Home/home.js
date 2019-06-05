import React from 'react';

import Carousel from 'nuka-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareRight, faCaretSquareLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import CarouselContent from './carouselContent';
import MediaQuery from 'react-responsive';

export default class Home extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            //videoURL: "https://www.istockphoto.com/fr/vid%C3%A9o/athl%C3%A8tes-masculins-propulsant-un-cr%C3%A2ne-de-quad-sur-un-lac-avec-le-soleil-en-arri%C3%A8re-gm843060762-139582203"
            videoURL: 'https://media.gettyimages.com/videos/let-the-road-guide-me-when-im-running-video-id962123092',
            events: []
        }
    }


    componentDidMount(){
        
        axios.get('http://localhost:4242/events/findAll')
        .then(response => {
            console.log(response.data.events);
            this.setState({events: response.data.events});
            

        })
        .catch(function(err){
            console.log(err);
        })
           
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
                        <p  className="paragraphe" style={{textAlign: "center", color: "white", fontSize:"50px", textTransform: "uppercase", fontWeight: "bold", justifyContent: "center"}}>Lorem ipsum dolor sit amet 
                        </p>
                        <p className="paragraphe2" style={{textAlign: "center", color: "white", fontSize:"20px", justifyContent: "center"}}>Lorem ipsum dolor sit amet 
                        </p>
                    </div>
                </div>

                <div className="title-event">
                    Evènements près de chez vous
                </div>
                <div className="carousel" style={{width:"100%"}}>
                    <MediaQuery query="(min-width: 1100px)">
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

                            {  
                                this.state.events.map(function(currentEvent, i){
                                    return(<CarouselContent events={currentEvent} key={i} />)
                                })   
                            }
                            
                        </Carousel>
                    </MediaQuery>
                    <MediaQuery query="(min-width: 571px)  and (max-width: 1099px)">
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
                            slidesToShow={2} 
                            cellSpacing={0}>

                            {  
                                this.state.events.map(function(currentEvent, i){
                                    return(<CarouselContent events={currentEvent} key={i} />)
                                })   
                            }
                            
                        </Carousel>
                    </MediaQuery>
                    <MediaQuery query="(max-width: 570px)">
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
                            slidesToShow={1} 
                            cellSpacing={0}>

                            {  
                                this.state.events.map(function(currentEvent, i){
                                    return(<CarouselContent events={currentEvent} key={i} />)
                                })   
                            }
                            
                        </Carousel>
                    </MediaQuery>
                </div>
            </div>  
        )
    }
}