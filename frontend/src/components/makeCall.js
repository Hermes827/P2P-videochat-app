import React from 'react';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class MakeCall extends React.Component {

  constructor(){
    super()

      this.state = {
        videoElement: false
      }
      this.localVideoRef = React.createRef()
      this.call = this.call.bind(this)
      this.gotStream = this.gotStream.bind(this)
  }

  // componentDidMount(){
  //   this.captureStream()
  // }
  //
  // captureStream(){
  //   navigator.mediaDevices.getUserMedia({
  //     video: true
  //   })
  // }
  renderVideoElement(){
    if(this.state.videoElement === true){
      return(
        <div className="videoDiv">
        <video
            ref={this.localVideoRef}
            autoPlay
            muted
            style={{
                width: "240px",
                height: "180px"
            }}
        />
        </div>
      )
    }
  }

  call(){
    this.setState({
      videoElement: true
    })
    navigator.mediaDevices
        .getUserMedia({
            video: true
        }).then(this.gotStream)
        .catch(e => alert("getUserMedia() error:" + e.name));
      };

  gotStream(stream){
    console.log(stream)
    this.localVideoRef.current.srcObject = stream;
    };


  render(){
  return (
    <div className="makeCall">
    {this.renderVideoElement()}
    <Container className="btn-container">
    <Row>
    <Col md={{span: 5, offset: 1}}><Button size="lg" block="true" onClick={this.call}>Call</Button></Col>
    <Col md={{span: 5, offset: 0}}><Button size="lg" block="true">Hangup</Button></Col>
    </Row>
    </Container>
    </div>
  );
}
}

export default MakeCall;
