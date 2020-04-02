import React, { Component } from 'react';
import axios from 'axios';
import './JokeList.scss';
import Joke from './Joke';
import {v4 as uuid} from 'uuid';
import FacePalm from './images/face-palm-cropped.png';

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
    this.seenJokes = new Set(this.state.jokes.map(joke => joke.joke))
    //new Set with text from existing jokes. Set used as it's more effiecient for duplicate checking
    this.moreJokes = this.moreJokes.bind(this)
  }

  componentDidMount(){
    // Get jokes if jokes array is empty.
    if (this.state.jokes.length === 0){
      this.getJokes()
    } 
  }

  async getJokes(){
    try {
      let newJokes = []
      while (newJokes.length < this.props.numJokesToGet) {
        let response = await axios.get('https://icanhazdadjoke.com/', {
          headers : {Accept: 'application/json'}
        })
        let newJoke = response.data.joke;
        if (!this.seenJokes.has(newJoke)) {
          // Checks to see if joke is in set of existing jokes.
          newJokes.push({joke: newJoke, votes: 0, id:uuid()})
        } else {
          console.log('found duplicate:')
          console.log(newJoke)
        }
        
      } 
      this.setState(oldState => ({
        jokes: [...oldState.jokes, ...newJokes],
        loading: false
        }),
       () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
      )
    } catch(error) {
      alert(error)
      this.setState({loading:false})
    }

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
    let jokeListSorted = this.state.jokes.sort((a,b) => b.votes - a.votes)
    if (this.state.loading){
      return (
        <div className='loading'>
          <h1>loading more hilarious jokes...</h1>
        </div>
      )
    } else {
      let jokeList = jokeListSorted.map(joke => {
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
}
export default JokeList