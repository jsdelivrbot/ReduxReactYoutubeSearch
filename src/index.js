import React, { Component } from 'react';
import __ from 'lodash';
import ReactDOM     from 'react-dom';
import YTSearch     from 'youtube-api-search';
import SearchBar    from './components/search_bar';
import VideoList    from './components/video_list'
import VideoDetail  from './components/video_detail'
const API_KEY = 'AIzaSyAuQCVeNfKhtRk9KlChQPT1nO27DPO_5Ss'

// step1. create a component.
class App extends Component {
  constructor(props){
    super(props);

    // whenever state changes => re-render
    this.state = {
      videos:[],
      selectedVideo: null
    }

    // calling API, callback => setState => render will be called
    this.videoSearch('surfboards')
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term: term, min: '10'}, (videos) => {
      this.setState({
        videos:         videos,
        selectedVideo:  videos[0]
      })
    });
  }

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300)
    return (
      <div>
        <SearchBar onSearchTermChange={ term => this.videoSearch(term)}/>
        <VideoDetail  video ={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}/>
      </div>
    );
  }
}
// step2. put it on the page
ReactDOM.render(<App />, document.querySelector('.container'))
