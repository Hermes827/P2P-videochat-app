import React from 'react';
import logo from './logo.svg';
import './App.css';
import adapter from 'webrtc-adapter';
let localStream;
let remoteStream;
let localPeerConnection;
let remotePeerConnection;
let startTime = null;

class App extends React.Component{

constructor(){
  super()

  // const localVideo = document.getElementById('localVideo');
  // const remoteVideo = document.getElementById('remoteVideo');
  this.localRef = React.createRef()
  this.remoteRef = React.createRef()
  this.videoRef = React.createRef()
  this.turnOnVideo = this.turnOnVideo.bind(this)
  this.handleVideo = this.handleVideo.bind(this)
  this.videoError = this.videoError.bind(this)
  // this.handleConnection = this.handleConnection.bind(this)
  this.callAction = this.callAction.bind(this)
}

 turnOnVideo(){
   navigator.mediaDevices.getUserMedia({video: true})
     .then(this.handleVideo)
     .catch(this.videoError)
 }
    // navigator.mediaDevices.getUserMedia({video: true, audio: true})
    // I have audio temporarily disabled because it keeps making a weird sound

 handleVideo(stream){
   this.videoRef.current.srcObject = stream
   localStream = stream
 }

 videoError(err){
   alert(err.name)
 }

 gotRemoteMediaStream(event) {
   const mediaStream = event.stream;
   // remoteVideo.srcObject = mediaStream;
   this.remoteRef.current.srcObject = mediaStream
   // remoteStream = mediaStream;
   // trace('Remote peer connection received remote stream.');
 }

 // function startAction() {
 //   startButton.disabled = true;
 //   navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
 //     .then(gotLocalMediaStream).catch(handleLocalMediaStreamError);
 //   trace('Requesting local stream.');
 // }

 // function gotLocalMediaStream(mediaStream) {
 //   localVideo.srcObject = mediaStream;
 //   localStream = mediaStream;
 //   trace('Received local stream.');
 //   callButton.disabled = false;  // Enable call button.
 // }

 getOtherPeer(peerConnection) {
   return (peerConnection === localPeerConnection) ?
       remotePeerConnection : localPeerConnection;
 }

 handleConnection(event) {
   console.log("hello")
   const peerConnection = event.target;
   const iceCandidate = event.candidate;

   if (iceCandidate) {
     const newIceCandidate = new RTCIceCandidate(iceCandidate);
     const otherPeer = this.getOtherPeer(peerConnection);

     otherPeer.addIceCandidate(newIceCandidate)
       // .then(() => {
       //   handleConnectionSuccess(peerConnection);
       // }).catch((error) => {
       //   handleConnectionFailure(peerConnection, error);
       // });
     //
     // trace(`${getPeerName(peerConnection)} ICE candidate:\n` +
     //       `${event.candidate.candidate}.`);
   }
 }

 callAction(e) {
   // e.target.disabled = true;
   // hangupButton.disabled = false;
   //
   // trace('Starting call.');
   startTime = window.performance.now();

   // Get local media stream tracks.
   // const videoTracks = localStream.getVideoTracks();
   // const audioTracks = localStream.getAudioTracks();
   // if (videoTracks.length > 0) {
   //   trace(`Using video device: ${videoTracks[0].label}.`);
   // }
   // if (audioTracks.length > 0) {
   //   trace(`Using audio device: ${audioTracks[0].label}.`);
   // }

   const servers = null;  // Allows for RTC server configuration.

   // Create peer connections and add behavior.
   localPeerConnection = new RTCPeerConnection(servers);
   console.log(localPeerConnection)
   this.handleConnection(localPeerConnection)
   // console.log(typeof localPeerConnection)

   // trace('Created local peer connection object localPeerConnection.');

   // localPeerConnection.addEventListener('icecandidate', this.handleConnection());
   // localPeerConnection.addEventListener(
   //   'iceconnectionstatechange', handleConnectionChange);
   //
   remotePeerConnection = new RTCPeerConnection(servers);
   this.handleConnection(remotePeerConnection)
   // trace('Created remote peer connection object remotePeerConnection.');
   //
   // remotePeerConnection.addEventListener('icecandidate', this.handleConnection());
   // remotePeerConnection.addEventListener(
   //   'iceconnectionstatechange', handleConnectionChange);
   // remotePeerConnection.addEventListener('addstream', gotRemoteMediaStream);
   //
   // // Add local stream to connection and create offer to connect.
   // localPeerConnection.addStream(localStream);
   // trace('Added local stream to localPeerConnection.');
   //
   // trace('localPeerConnection createOffer start.');
   // localPeerConnection.createOffer(offerOptions)
   //   .then(createdOffer).catch(setSessionDescriptionError);
 }

 render() {
   return (
     <div>
     <video id="video-chat" autoPlay="true" ref={this.videoRef}>
     </video>
     <video id="video-chat" autoPlay="true" ref={this.videoRef}>
     </video>
     <video id="localVideo" autoplay playsinline ref={this.localRef}></video>
     <video id="remoteVideo" autoplay playsinline ref={this.remoteRef}></video>
     <button onClick={this.turnOnVideo}>turn on video</button>
       <button id="startButton">Start</button>
       <button id="callButton" onClick={this.callAction}>Call</button>
       <button id="hangupButton">Hang Up</button>
       {console.log(this.localRef)}
     </div>
   )
 }
}

export default App;
