import React from 'react';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "webrtc-adapter";
let localStream = null

class MakeCall extends React.Component {

  constructor(){
    super()

      this.state = {
        videoElement: false,
        callDisabled: false,
        hangUpDisabled: true,
        servers: null,
        pc1: null,
        pc2: null,
        localStream: null
      }

      this.onCreateOfferSuccess = this.onCreateOfferSuccess.bind(this)
      this.onCreateAnswerSuccess = this.onCreateAnswerSuccess.bind(this)
      this.onIceStateChange = this.onIceStateChange.bind(this)
      this.onIceStateChange = this.onIceStateChange.bind(this)
      this.hangUp = this.hangUp.bind(this)
      this.call = this.call.bind(this)
      this.gotStream = this.gotStream.bind(this)
      this.remoteVideoRef = React.createRef()
      this.localVideoRef = React.createRef()
  }

  renderVideoElement(){
    if(this.state.videoElement === true){
      return(
        <div className="videoDiv">
        <video
          className="localVideo"
            ref={this.localVideoRef}
            autoPlay
        />
        <video
            className="remoteVideo"
            ref={this.remoteVideoRef}
            autoPlay
        />
        </div>
      )
    }
  }

  call(){
    this.setState({
      videoElement: true,
      callDisabled: true,
      hangUpDisabled: false
    })
    navigator.mediaDevices
        .getUserMedia({
            video: true
        }).then(this.gotStream)
        .catch(e => alert("getUserMedia() error:" + e.name));
      };

  gotStream(stream){
    this.localVideoRef.current.srcObject = stream;
    this.setState({
        localStream: stream
    });
    localStream = stream
    this.connect()
    };

  gotRemoteStream = event => {
      let remoteVideo = this.remoteVideoRef.current;
      if (remoteVideo.srcObject !== event.streams[0]) {
          remoteVideo.srcObject = event.streams[0];
      }
  };

  connect(){
    let {localStream} = this.state;
    let servers = null,
        pc1 = new RTCPeerConnection(servers),
        pc2 = new RTCPeerConnection(servers);

       pc1.onicecandidate = e => this.onIceCandidate(pc1, e);
       pc1.oniceconnectionstatechange = e => this.onIceStateChange(pc1, e);

       pc2.onicecandidate = e => this.onIceCandidate(pc2, e);
       pc2.oniceconnectionstatechange = e => this.onIceStateChange(pc2, e);
       pc2.ontrack = this.gotRemoteStream;

       localStream.getTracks().forEach(track => pc1.addTrack(track, localStream));

       pc1.createOffer({offerToReceiveAudio: 1, offerToReceiveVideo: 1})
       .then(this.onCreateOfferSuccess,
         error => console.error("Failed to create session description",
         error.toString())
       );

       console.log("servers after call", servers);

       this.setState({
           servers,
           pc1,
           pc2,
           localStream
       });
  }

  onCreateOfferSuccess(desc){
    let {pc1, pc2} = this.state;

    pc1.setLocalDescription(desc)
    .then(() => console.log("pc1 setLocalDescription complete createOffer"),
    error => console.error("pc1 Failed to set session description in createOffer",
    error.toString()));

    pc2.setRemoteDescription(desc)
    .then(() => {console.log("pc2 setRemoteDescription complete createOffer");
    pc2.createAnswer()
    .then(this.onCreateAnswerSuccess, error => console.error("pc2 Failed to set session description in createAnswer",
    error.toString()));
    }, error => console.error("pc2 Failed to set session description in createOffer",
    error.toString()));
  };

  onCreateAnswerSuccess(desc){
    let {pc1, pc2} = this.state;

    pc1.setRemoteDescription(desc)
    .then(() => {console.log("pc1 setRemoteDescription complete createAnswer");
    console.log("servers after createAnswer", this.state.servers)},
    error => console.error("pc1 Failed to set session description in onCreateAnswer",
    error.toString())
  );

    pc2.setLocalDescription(desc)
    .then(() => console.log("pc2 setLocalDescription complete createAnswer"),
    error => console.error("pc2 Failed to set session description in onCreateAnswer",
    error.toString()));
  };

  onIceCandidate(pc, event){
    let { pc1, pc2 } = this.state;
    let otherPc = pc === pc1 ? pc2 : pc1;

    otherPc.addIceCandidate(event.candidate)
    .then(() => console.log("addIceCandidate success"),
    error => console.error("failed to add ICE Candidate",
    error.toString()));
  };

  onIceStateChange(pc, event){
    console.log("ICE state:", pc.iceConnectionState);
  };

  hangUp(){
    let {pc1, pc2} = this.state;

    pc1.close();
    pc2.close();

    this.setState({
        pc1: null,
        pc2: null,
        hangUpDisabled: true,
        callDisabled: false,
        videoElement: false
    });
    localStream.getTracks()[0].stop();
    this.props.return()
  };

  render(){
  const {callDisabled, hangUpDisabled} = this.state;
  return (
    <div className="makeCall">
    {this.renderVideoElement()}
    <Container className="btn-container">
    <Row>
    <Col md={{span: 5, offset: 1}}><Button size="lg" block="true" onClick={this.call} disabled={callDisabled}>Call</Button></Col>
    <Col md={{span: 5, offset: 0}}><Button size="lg" block="true" onClick={this.hangUp} disabled={hangUpDisabled}>Hangup</Button></Col>
    </Row>
    </Container>
    </div>
  );
}
}

export default MakeCall;
