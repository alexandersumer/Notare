import React from 'react';
import '../css/App.css';
import backendapi from '../api/backendapi';
import { GoogleLogin } from 'react-google-login';
import config from '../config.json';


class App extends React.Component {

  constructor(props) {
      super(props);
      //console.log(props);
      this.state = { 
          videos: [],
          isAuthenticated: false,
          user: null,
          token: ''
      };
    
  }

  logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null})
  };

  onFailure = (error) => {
    alert(error);
  };

  googleResponse = (response) => {
    console.log(response)
    // const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    // const options = {
    //     method: 'POST',
    //     body: tokenBlob,
    //     mode: 'cors',
    //     cache: 'default'
    // };
    
    // fetch('http://localhost:4000/api/v1/auth/google', options).then(r => {
    //     const token = r.headers.get('x-auth-token');
    //     r.json().then(user => {
    //         if (token) {
    //             this.setState({isAuthenticated: true, user, token})
    //         }
    //     });
    // })

    //TODO remove below line
    this.setState({isAuthenticated: true, user: 'mitch', token: response.accessToken})

  };

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
  
      //this.setState({videos: response.data)});

    }
  }

  componentDidMount() {
      //this.getVideos();
  }

  render() {
    let content = !!this.state.isAuthenticated ?
        (
            <div>
                <p>Authenticated</p>
                <div>
                    {this.state.user.email}
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
                    onSuccess={this.googleResponse}
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
