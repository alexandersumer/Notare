import React from 'react';
import '../css/App.css';
import backendapi from '../api/backendapi';
import { GoogleLogin } from 'react-google-login';
import config from '../config.json';


class App extends React.Component {

  constructor(props) {
      super(props);
      //console.log(props);
      const user_id = localStorage.getItem('userId');
      const accessToken = localStorage.getItem('accessToken');
      const authenticated = (accessToken !== null) ? true : false
      this.state = { 
          videos: [],
          isAuthenticated: authenticated,
          userId: user_id,
          accessToken: accessToken
      };
      console.log(this.state);
  }

  logout = async () => {
    backendapi.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.accessToken;
    const backend_response = await backendapi.delete('/auth/google/logout')
    console.log(backend_response)
    if (backend_response.status === 200) {
      localStorage.removeItem('userId');
      localStorage.removeItem('accessToken');
      this.setState({isAuthenticated: false, accessToken: '', userId: null, videos: []});
    } else {
      console.log("failed to logout");
    }
  };

  onFailure = (error) => {
    console.log(error);
  };

  googleLoginResponse = async (response) => {
    console.log(response)
    console.log(response.accessToken)
    console.log(response.profileObj.email)
    const backend_response = await backendapi.post('/auth/google/login', {
      googleAccessToken: response.accessToken,
      email: response.profileObj.email
    })
    console.log(backend_response)

    if (backend_response.status === 200) {
      localStorage.setItem('accessToken', backend_response.data.accessToken);
      localStorage.setItem('userId', backend_response.data.user_id);
      this.setState({isAuthenticated: true, userId: backend_response.data.user_id, accessToken: backend_response.data.accessToken})
      this.getVideos();
    }
  };

  getVideos = async () => {
    //if (event) event.preventDefault();
    backendapi.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.accessToken;
    const response = await backendapi.get('/videos', {
      params: {
        user_id: this.state.userId
      }
    });
    console.log(response.status)
    console.log(response.data)
    if (response.status === 200) {
  
      this.setState({videos: response.data.videos});

    }
  }

  componentDidMount() {
    if (this.state.isAuthenticated) {
      this.getVideos();
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

  render() {
    let content = !!this.state.isAuthenticated ?
        (
            <div>
                <p>Authenticated</p>
                <div>
                    user_id: {this.state.userId}
                    <div>videos: {this.videoList()}</div>
                </div>
                <div>
                    <button onClick={this.logout} className="button">
                        Log out
                    </button>
                </div>
            </div>
        ) :
        (
            <div>
                <GoogleLogin
                    clientId={config.GOOGLE_CLIENT_ID}
                    buttonText="Login"
                    onSuccess={this.googleLoginResponse}
                    onFailure={this.onFailure}
                />
            </div>
        );

    return (
        <div className="App">
            {content}
        </div>
    );
  }
}

export default App;
