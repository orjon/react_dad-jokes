import React, { Component } from 'react';
import './Joke.scss';


class Joke extends Component {

  voteColorEmoji(){
    if (this.props.jokeVotes >= 15) {
      return {color:'#4CAF50', face:'em em-rolling_on_the_floor_laughing'}
    } else if (this.props.jokeVotes >= 12) {
      return {color: '#8BC34A', face: 'em em-laughing'}
    } else if (this.props.jokeVotes >= 9) {
      return {color: '#CDDC39', face:'em em-smiley'}
    } else if (this.props.jokeVotes >= 6) {
      return {color: '#FFEB3B', face: 'em em-slightly_smiling_face'}
    } else if (this.props.jokeVotes >= 3) {
      return {color: '#FFC107', face: 'em em-neutral_face'}
    } else if (this.props.jokeVotes >= 0) {
      return {color: '#FF9800', face:'em em-confused'}
    } else {
      return {color: '#F44336', face:'em em-angry'}
    }
  }

  render(){
    let voteValues = this.voteColorEmoji();
    return(
      <div className='Joke'>
        <div className='Joke-votes'>
          <div onClick={this.props.voteUp} className='vote up'>
            <p>↑</p>
          </div>
          <div className='votes' style={{borderColor: voteValues.color}}>
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
        <i className={voteValues.face} aria-label='BIRD'></i>
        </div>
      </div>
    )
  }
}

export default Joke