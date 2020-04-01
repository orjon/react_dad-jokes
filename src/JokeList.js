import React, { Component } from 'react';
import axios from 'axios';
import './JokeList.css';
import Joke from './Joke';

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
      jokes.push({joke: joke, rating: 0})
    } 
    this.setState({jokes: jokes})
  }

  // jokeUpVote(index){
  //   let currentJokes = this.state.jokes
  //   let newRating = (currentJokes.jokes[index].rating)+1;

  //   let newJokes = 

  //   this.setState({
  //     jokes: ...jokes})
  // }

  // jokeDownVote(index){

  // }

  render(){
    let jokeList = this.state.jokes.map(joke => {
      return (
        <div className='Joke'>
          <Joke
            jokeText={joke.joke}
            jokeRating={joke.rating}
          />
       </div>
      )
    })
    
    return(
      <div className='JokeList'>
        <h1>JokeList</h1>
        <div className='JokeList-jokes'>
          {jokeList}
        </div>

      </div>
    )
  }
}
export default JokeList