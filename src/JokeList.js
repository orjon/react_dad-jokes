import React, { Component } from 'react';
import axios from 'axios';
import './JokeList.scss';
import Joke from './Joke';
import {v4 as uuid} from 'uuid';
import FacePalm from './images/face-palm.png';

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet : 10
  }
  constructor(props){
    super(props);
    this.state = {
      jokes: [],
    }
  }

  async componentDidMount(){
    let jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      let response = await axios.get('https://icanhazdadjoke.com/', {
        headers : {Accept: 'application/json'}
      })
      let joke = response.data.joke;
      jokes.push({joke: joke, votes: 0, id:uuid()})
    } 
    this.setState({jokes: jokes})
  }

  handleVote(index, delta){
    this.setState(oldState => ({
      jokes: oldState.jokes.map(joke => 
        joke.id === index ? {...joke, votes: joke.votes + delta} : joke
      )
    }))
  }


  render(){
    let jokeList = this.state.jokes.map(joke => {
      return (
        <div className='Joke' key={joke.id}>
          <Joke
            jokeText={joke.joke}
            jokeId={joke.id}
            jokeVotes={joke.votes}
            voteUp={() => this.handleVote(joke.id, 1)}
            voteDown={() => this.handleVote(joke.id, -1)}
          />
       </div>
      )
    })
    
    return(
      <div className='JokeList'>
        <div className='JokeList-sidebar'>
          <h1>Dad Jokes</h1>
          <img src={FacePalm} alt='older man face-palming'/>
          <button className='JokeList-getMore'>New Jokes</button>
        </div>
        <div className='JokeList-jokes'>
          {jokeList}
        </div>
      </div>
    )
  }
}
export default JokeList