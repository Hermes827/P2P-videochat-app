import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{

constructor(){
  super()

  this.videoRef = React.createRef()
}

 componentDidMount(){
   navigator.mediaDevices.getUserMedia({video: true, audio: true})
     .then(this.handleVideo)
     .catch(this.videoError)
 }

 handleVideo = (stream) => {
   this.videoRef.current.srcObject = stream
 }

 videoError = (err) => {
   alert(err.name)
 }

 render() {
   return (
     <video id="video-chat" autoPlay="true" ref={this.videoRef}>
     </video>
   )
 }
}

export default App;
