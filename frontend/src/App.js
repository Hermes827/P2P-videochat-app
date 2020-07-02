import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import MakeCall from './components/makeCall.js'

class App extends React.Component {

  constructor(){
    super()

    this.state = {
      jumbotron: true,
      makeCall: false
    }

    this.makeCall = this.makeCall.bind(this)
    this.returnHome = this.returnHome.bind(this)
  }

  makeCall(){
    this.setState({
      jumbotron: false,
      makeCall: true
    })
  }

  renderJumboTron(){
    if(this.state.jumbotron === true){
      return(
        <Container className="container">
        <Jumbotron className="jumbotron">
          <h1>Hello User</h1>
          <p>
            Welcome to P2P videochat app, would you like to make a call?
          </p>
            <Button variant="primary" onClick={this.makeCall}>Make a call</Button>
       </Jumbotron>
       </Container>
      )
    }
  }

  renderMakeCall(){
    if(this.state.makeCall === true){
      return(
        <MakeCall return={this.returnHome}/>
      )
    }
  }

  returnHome(){
    this.setState({
      jumbotron: true,
      makeCall: false
    })
  }

  render(){
  return (
    <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
      {this.renderJumboTron()}
      {this.renderMakeCall()}
    </div>
  );
}
}

export default App;
