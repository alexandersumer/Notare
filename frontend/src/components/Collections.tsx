import * as React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect, RouteComponentProps, RouteProps } from "react-router-dom";
import backendapi from "../api/backendapi";


type CollectionProps = {

}

interface VideoType {
  video_id: string,
  user_id: number,
  video_title: string,
  categories: Array<string>,
  notes_ids: Array<number>,
  notes_count: number
}

interface CollectionState {
  videos: Array<VideoType>
}

class Collections extends React.Component {
    state: CollectionState;

    constructor (props: React.Props<CollectionProps>) {
      super(props);
      this.state = {
          videos: []
      }
    }

    componentDidMount()  {
      this.getVideos();
    }

    getVideos = async () => {
      // TODO ask guy how to get this info from props
      const accessToken = localStorage.getItem('accessToken');
      backendapi.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
      const response = await backendapi.get('/videos', {
        params: {
            user_id: 2
          }
      })
      if (response.status === 200) {
          this.setState({videos: response.data.videos});
      }
    }

    videoList = () => {
      const listItems = this.state.videos.map((video) =>
        <li key={video.video_id}>{video.video_title}: {video.video_id}</li>
      );
      return (
        <ul>{listItems}</ul>
      );
    }

    render() {
      return (
        <div>    
            <h1>Collections</h1>  
            <div>
                <nav>
                    <Link to="/Home">Home</Link>
                    <Link to="/Notes">Notes</Link>
                    <Link to="/Collections">Collections</Link>
                </nav>
            </div> 
            Videos
            {this.videoList()}      
        </div>
      )
    }
}

export default Collections;

