import * as React from "react";
import HomePage from "./HomePage";
import AboutUsPage from "./AboutUsPage";
import NotePage from "./NotePage";
import VideoPage from "./VideoPage";
import VideoNotesPage from "./VideoNotesPage";
import { postLogin, postCreateAccount } from "../api/auth";
import CategoryVideosPage from "./CategoryVideosPage";
import Login from "../components/Login";
import CreateAccount from "../components/CreateAccount";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteProps,
  Redirect
} from "react-router-dom";

export const AuthService = {
  isAuthenticated:
    localStorage.getItem("accessToken") === null ||
    localStorage.getItem("accessToken") === undefined
      ? false
      : true,
  accessToken:
    localStorage.getItem("accessToken") === null ||
    localStorage.getItem("accessToken") === undefined
      ? ""
      : localStorage.getItem("accessToken"),
  userId:
    localStorage.getItem("userId") === null ||
    localStorage.getItem("userId") === undefined
      ? -1
      : parseInt(localStorage.getItem("userId") as string),
  async authenticate(email: string, password: string) {
    const response = await postLogin({ email: email, password: password });
    if (response) {
      this.isAuthenticated = true;
      this.accessToken = response.accessToken;
      this.userId = response.user_id;
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("userId", response.user_id.toString());
      localStorage.setItem("email", email);
    }
  },
  async createAccount(email: string, password: string) {
    const response = await postCreateAccount({
      email: email,
      password: password
    });
    if (response) {
      this.isAuthenticated = true;
      this.accessToken = response.accessToken;
      this.userId = response.user_id;
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("userId", response.user_id.toString());
      localStorage.setItem("email", email);
    }
  },
  logout(cb: Function) {
    this.isAuthenticated = false;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    setTimeout(cb, 100);
  }
};

interface PrivateRouteProps extends RouteProps {
  component: any;
  isAuthenticated: boolean;
  userId: number;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={routeProps =>
        AuthService.isAuthenticated ? (
          <Component {...rest} {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: routeProps.location }
            }}
          />
        )
      }
    />
  );
};


interface State {
  isAuthenticated: boolean;
}

class App extends React.Component<{}, State> {
  constructor(props: {}, state: State){
    super(props, state);
    this.state = {
      isAuthenticated: false,
    }
  }

  async onLogin(email: string, password: string) {
    await AuthService.authenticate(email, password);
    this.setState ({
      isAuthenticated: AuthService.isAuthenticated,
    })
  }

  async onCreateAccount(email: string, password: string) {
    await AuthService.createAccount(email, password);
    this.setState ({
      isAuthenticated: AuthService.isAuthenticated,
    })
  }

  render() {
    const { isAuthenticated } = this.state;
    return (
      <Router>
        <div>
          <Switch>
            <PrivateRoute
              path="/Notes"
              component={NotePage}
              isAuthenticated={AuthService.isAuthenticated}
              userId={AuthService.userId}
            />
            <PrivateRoute
              path="/Videos"
              component={VideoPage}
              isAuthenticated={AuthService.isAuthenticated}
              userId={AuthService.userId}
            />
            <PrivateRoute
              path="/AboutUs"
              component={AboutUsPage}
              isAuthenticated={AuthService.isAuthenticated}
              userId={AuthService.userId}
            />
            <PrivateRoute
              path="/VideoNotes/:video_id"
              component={VideoNotesPage}
              isAuthenticated={AuthService.isAuthenticated}
              userId={AuthService.userId}
            />
            <PrivateRoute
              path="/CategoryVideos/:category"
              component={CategoryVideosPage}
              isAuthenticated={AuthService.isAuthenticated}
              userId={AuthService.userId}
            />
            <Route exact path="/Login" render={routeProps => <Login {...routeProps} onLogin={this.onLogin.bind(this)} isAuthenticated={isAuthenticated}/>} />;
            <Route exact path="/CreateAccount" render={routeProps => <CreateAccount {...routeProps} onCreateAccount={this.onCreateAccount.bind(this)} isAuthenticated={isAuthenticated}/>} />
 
            <Route path="/" exact component={HomePage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
