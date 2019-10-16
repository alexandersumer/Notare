import React from 'react';
import '../css/App.css';
import backendapi from '../api/backendapi';




class App extends React.Component {

  constructor(props) {
      super(props);
      //console.log(props);
      this.state = { 
          videos: []
      };
    
  }

  getVideos = async () => {
    //if (event) event.preventDefault();
    const response = await backendapi.get('/videos', {
      params: {
        user_id: 1
      }
    });
    console.log(response.status)
    console.log(response.data)
    if (response.status === 200) {
  
      this.setState({videos: response.data.videos});

    }
  }

  videoList = () => {
    const listItems = this.state.videos.map((video) =>
      <li key={video.video_id}>{video.video_id}</li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }

  componentDidMount() {
      this.getVideos();
  }

  render() {
    
    return (
      <div className="App">
        {this.videoList()}
      </div>
    );
  }
}

export default App;
