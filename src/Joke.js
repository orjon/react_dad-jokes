import React, { Component } from 'react';
import './Joke.scss';


class Joke extends Component {

  borderColor(){
    if (this.props.jokeVotes >= 15) {
      return '#4CAF50'
    } else if (this.props.jokeVotes >= 12) {
      return '#8BC34A'
    } else if (this.props.jokeVotes >= 9) {
      return '#CDDC39'
    } else if (this.props.jokeVotes >= 6) {
      return '#FFEB3B'
    } else if (this.props.jokeVotes >= 3) {
      return '#FFC107'
    } else if (this.props.jokeVotes >= 0) {
      return '#FF9800'
    } else {
      return '#F44336'
    }
  }
  
  emojiFace(){
    if (this.props.jokeVotes >= 15) {
      return 'em em-rolling_on_the_floor_laughing'
    } else if (this.props.jokeVotes >= 12) {
      return 'em em-laughing'
    } else if (this.props.jokeVotes >= 9) {
      return 'em em-smiley'
    } else if (this.props.jokeVotes >= 6) {
      return 'em em-slightly_smiling_face'
    } else if (this.props.jokeVotes >= 3) {
      return 'em em-neutral_face'
    } else if (this.props.jokeVotes >= 0) {
      return 'em em-confused'
    } else {
      return 'em em-angry'
    }
  }
  // 'em em-rolling_on_the_floor_laughing';
  // 'em em-laughing';
  // 'em em-smiley';
  // 'em em-slightly_smiling_face';
  // 'em em-neutral_face';
  // 'em em-confused';
  // 'em em-angry';

  render(){
    return(
      <div className='Joke'>
        <div className='Joke-votes'>
          <div onClick={this.props.voteUp} className='vote up'>
            <p>↑</p>
          </div>
          <div className='votes' style={{borderColor: this.borderColor()}}>
            <p>{this.props.jokeVotes}</p>
          </div>
          <div onClick={this.props.voteDown} className='vote down'>
            <p>↓</p>
          </div>
        </div>
        <div className='Joke-text'>
          {this.props.jokeText}
        </div>
        <div className='Joke-emoji'>
        <i className={this.emojiFace()} aria-label='BIRD'></i>
        </div>
      </div>
    )
  }
}

export default Joke