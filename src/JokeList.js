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
      jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
      // Set this.state.jokes to localStorage('jokes') if not empty
      // *Can clear localStorage with: window.localStorage.clear() OR window.localStorage.clear('jokes') 
      loading: false //varible for loading animation
    }
    this.moreJokes = this.moreJokes.bind(this)
  }

  componentDidMount(){
    // Get jokes if jokes array is empty.
    if (this.state.jokes.length === 0){
      this.getJokes()
    } 
  }

  async getJokes(){
    let newJokes = []
    while (newJokes.length < this.props.numJokesToGet) {
      let response = await axios.get('https://icanhazdadjoke.com/', {
        headers : {Accept: 'application/json'}
      })
      let joke = response.data.joke;
      newJokes.push({joke: joke, votes: 0, id:uuid()})
    } 
    this.setState(oldState => ({
      jokes: [...oldState.jokes, ...newJokes]
    }),
    () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes)))
  }

  moreJokes(){
    this.setState({loading:true}, this.getJokes)
    //this.getJokes is a call-back to insure it is only run once state has been set.
  }

  handleVote(index, delta){
    this.setState(oldState => ({
      jokes: oldState.jokes.map(joke => 
        joke.id === index ? {...joke, votes: joke.votes + delta} : joke
      )
    }),
    () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes)))
  }


  render(){
    let jokeList = this.state.jokes.map(joke => {
      return (
        <div key={joke.id}>
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
          <button onClick={this.moreJokes} className='JokeList-getMore'>More jokes please daddy!</button>
        </div>
        <div className='JokeList-jokes'>
          {jokeList}
        </div>
      </div>
    )
  }
}
export default JokeList