import React, { Component } from 'react';
import './Joke.scss';


class Joke extends Component {
  render(){
    return(
      <div className='Joke'>
        <div className='Joke-buttons'>
          <span onClick={this.props.voteUp} className='voteUp'>↑</span>
          <span className='votes'>{this.props.jokeVotes}</span>
          <span onClick={this.props.voteDown} className='voteDown'>↓</span>
        </div>
        <div className='Joke-text'>
          {this.props.jokeText}
        </div>
      </div>
    )
  }
}

export default Joke