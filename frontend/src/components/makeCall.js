import React from 'react';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

class MakeCall extends React.Component {

  constructor(){
    super()

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

  render(){
  return (
    <div className="makeCall">
    <Container>
    <Button className="btn">Call</Button>
    <Button className="btn">Hangup</Button>
    </Container>
    </div>
  );
}
}

export default MakeCall;
