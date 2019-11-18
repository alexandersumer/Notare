import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
  RouteProps,
  Redirect
} from "react-router-dom";
import { SyntheticEvent } from "react";
import HomePage from "./HomePage";
import AboutUsPage from "./AboutUsPage";
import NotePage from "./NotePage";
import VideoPage from "./VideoPage";
import VideoNotesPage from "./VideoNotesPage";
import { postLogin } from "../api/login";
import CategoryVideosPage from "./CategoryVideosPage";

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
  async authenticate(email: string, password: string, cb: Function) {
    const response = await postLogin({ email: email, password: password });
    if (response) {
      this.isAuthenticated = true;
      this.accessToken = response.accessToken;
      this.userId = response.user_id;
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("userId", response.user_id.toString());
      localStorage.setItem("email", email);
    }
    setTimeout(cb, 100);
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

const PublicRoute = (props: RouteProps) => {
  const { component: Component, ...rest } = props;

  return <Route {...rest} render={routeProps => <Login {...routeProps} />} />;
};

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <PrivateRoute
              path="/Home"
              component={HomePage}
              isAuthenticated={AuthService.isAuthenticated}
              userId={AuthService.userId}
            />
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
            <PublicRoute exact path="/" />
          </Switch>
        </div>
      </Router>
    );
  }
}

class Login extends React.Component<RouteComponentProps> {
  state = {
    redirectToPreviousRoute: false,
    email: "",
    password: ""
  };

  login = (event: SyntheticEvent) => {
    event.preventDefault();
    AuthService.authenticate(this.state.email, this.state.password, () => {
      this.setState({ redirectToPreviousRoute: true });
    });
  };

  updateEmail = (event: SyntheticEvent) => {
    event.preventDefault();
    this.setState({ email: (event.target as HTMLInputElement).value });
  };

  updatePassword = (event: SyntheticEvent) => {
    event.preventDefault();
    this.setState({ password: (event.target as HTMLInputElement).value });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToPreviousRoute } = this.state;

    if (AuthService.isAuthenticated) {
      return <Redirect to="/Home" />;
    }

    if (redirectToPreviousRoute) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <div>
          <h2>
            <div>Log-in to your account</div>
          </h2>
          <form onSubmit={this.login}>
            <div>
              <div>
                <div>
                  <i></i>
                  <input
                    type="text"
                    name="email"
                    placeholder="email"
                    onChange={this.updateEmail}
                  />
                </div>
              </div>
              <div>
                <div>
                  <i></i>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.updatePassword}
                  />
                </div>
              </div>
              <button>Login</button>
            </div>

            <div></div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
