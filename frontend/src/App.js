import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{

constructor(){
  super()

  this.videoRef = React.createRef()
  this.turnOnVideo = this.turnOnVideo.bind(this)
  this.handleVideo = this.handleVideo.bind(this)
  this.videoError = this.videoError.bind(this)

}

 turnOnVideo(){
   navigator.mediaDevices.getUserMedia({video: true, audio: true})
     .then(this.handleVideo)
     .catch(this.videoError)

 }

 handleVideo(stream){
   this.videoRef.current.srcObject = stream
 }

 videoError(err){
   alert(err.name)
 }

 render() {
   return (
     <div>
     <video id="video-chat" autoPlay="true" ref={this.videoRef}>
     </video>
     <button onClick={this.turnOnVideo}>turn on video</button>
     </div>
   )
 }
}

export default App;
