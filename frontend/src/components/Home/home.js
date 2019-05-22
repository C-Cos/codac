import React from 'react';
import pic from "../../img/kristopher-roller-188180-unsplash.jpg";
import { Carousel } from 'react-responsive-carousel';



export default class Home extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            //videoURL: "https://www.istockphoto.com/fr/vid%C3%A9o/athl%C3%A8tes-masculins-propulsant-un-cr%C3%A2ne-de-quad-sur-un-lac-avec-le-soleil-en-arri%C3%A8re-gm843060762-139582203"
            videoURL: "https://media.istockphoto.com/videos/male-relay-runners-passing-batons-on-track-video-id181538149"
            //videoURL: 'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4'
        }
    }
    render () {
        return (
            <div>
                <div style={{width: '100%', height: '400px', overflow: 'hidden', position: "relative", zindex:0, display: "flex", justifyContent: "center", alignItems: "center"}}>
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
                        <p style={{textAlign: "center", color: "black", fontSize:"20px", fontWeight: "bold", fontStyle: "italic", justifyContent: "center"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Vivamus sit amet quam lorem. Vestibulum eleifend sapien dui, tincidunt maximus libero convallis a. 
                            Cras non lorem varius, dapibus purus sed, iaculis massa. Mauris iaculis dignissim semper. 
                        </p>
                    </div>
                </div>
                
                <Carousel>
                    <div>
                        <img src={pic} alt=""/>
                        <p className="legend">Legend 1</p>
                    </div>
                    <div>
                        <img src={pic} alt=""/>
                        <p className="legend">Legend 2</p>
                    </div>
                    <div>
                        <img src={pic} alt=""/>
                        <p className="legend">Legend 3</p>
                    </div>
                </Carousel>
            </div>  
        )
    }
}