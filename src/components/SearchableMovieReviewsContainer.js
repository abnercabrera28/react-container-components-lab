import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'LqVU51cTG6JXT6IS3LY6Wys4PVnmrydA';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}`;

// Code SearchableMovieReviewsContainer Here

class SearchableMovieReviewsContainer extends Component {

    constructor(props) {
        super(props);
  
        // Initial state here...
        this.state = {
            searchTerm: "car",
            reviews: []
        };
      }
  
      handleSubmit(searchTerm) {
          fetch(URL+`&query=${searchTerm}`)
            .then(response => response.json())
            .then(reviewData => this.setState({ reviews: reviewData.results }))
        }
  
      shouldComponentUpdate(nextProps, nextState) {
          if (this.state.reviews === nextState.reviews) {
            return false
          }
          return true
        }
  
      handleChange = (event)=>{
          this.setState(
              {
                  ...this.state.reviews,
                  searchTerm: event.target.value
              }   
          )
      }
  
  
  
      render() {
        // Return JSX that renders into HTML
        return(
      <div className="searchable-movie-reviews">
          <form onSubmit={()=> this.handleSubmit(this.state.searchTerm)}>
          <div>
            <label>
              Search
              <input id="username" name="username" onChange={e => this.handleChange(e)} type="text" value={this.state.searchTerm} />
            </label>
          </div>
          <div>
            <button type="submit">Search</button>
          </div>
        </form>
          <MovieReviews reviews={this.state.reviews}/>
      </div>
        )
      }
    }

export default SearchableMovieReviewsContainer;