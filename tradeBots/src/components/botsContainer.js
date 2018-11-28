import React, { Component } from 'react';
import BotView from './botView';
import io from 'socket.io-client';

class BotsContainer extends Component {
  constructor() {
    super();
    this.state = { socket: io('localhost:4000') };
  }

  componentWillUnmount() {
    this.state.socket.close();
  }

  render() {
    return (
      <div className="card-deck mt-3 mr-3 ml-3">
        <BotView name="bot1" socket={this.state.socket} />
        <BotView name="bot2" socket={this.state.socket} />
        <BotView name="bot3" socket={this.state.socket} />
        <BotView name="bot4" socket={this.state.socket} />
      </div>
    );
  }
}

export default BotsContainer;
