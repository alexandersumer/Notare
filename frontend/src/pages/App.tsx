import * as React from "react";
import HomePage from "./HomePage";
import AboutUsPage from "./AboutUsPage";
import NotePage from "./NotePage";
import VideoPage from "./VideoPage";
import VideoNotesPage from "./VideoNotesPage";
import { postLogin, postCreateAccount } from "../api/auth";
import Login from "../components/Login";
import { Logout } from "../api/auth";
import Navbar from "../components/Navbar";
import CreateAccount from "../components/CreateAccount";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteProps,
  Redirect
} from "react-router-dom";
import { __RouterContext } from "react-router";

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
  async authenticate(email: string, password: string) : Promise<string> {
    const response = await postLogin({ email: email, password: password });
    if (typeof response === "string") {
      console.log("login failed setting errorMessage");
      return response
    } else {
      this.isAuthenticated = true;
      this.accessToken = response.accessToken;
      this.userId = response.user_id;
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("userId", response.user_id.toString());
      localStorage.setItem("email", email);
      return "" 
    }
  },
  async createAccount(email: string, password: string) : Promise<string> {
    const response = await postCreateAccount({
      email: email,
      password: password
    });
    if (typeof response === "string") {
      console.log("login failed setting errorMessage");
      return response;
    } else {
      this.isAuthenticated = true;
      this.accessToken = response.accessToken;
      this.userId = response.user_id;
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("userId", response.user_id.toString());
      localStorage.setItem("email", email);
      return ""; 
    }
  },
  async logout() {
    await Logout();
    this.isAuthenticated = false;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
  }
};

interface PrivateRouteProps extends RouteProps {
  component: any;
  isAuthenticated: boolean;
  userId: number;
  Navbar: React.FC;
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
  constructor(props: {}, state: State) {
    super(props, state);
    this.state = {
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    this.setState({
      isAuthenticated: AuthService.isAuthenticated,
    });
  }

  async onLogin(email: string, password: string){
    const responseString = await AuthService.authenticate(email, password);
    return responseString;
  }

  async onCreateAccount(email: string, password: string) : Promise<string>{
    const responseString = await AuthService.createAccount(email, password);
    return responseString
  }

  async onCheckAuth() {
    this.setState({
      isAuthenticated: AuthService.isAuthenticated,
    });
  }

  async onLogout() {
    await AuthService.logout();
    this.setState({
      isAuthenticated: AuthService.isAuthenticated
    });
  }

  render() {
    const { isAuthenticated } = this.state;
    const MyNavbar = () => (
      <Navbar
        email={localStorage.getItem("email") || ""}
        isAuthenticated={this.state.isAuthenticated}
        onLogout={this.onLogout.bind(this)}
      />
    );
    return (
      <Router>
        <div>
          <Switch>
            <PrivateRoute
              path="/Notes"
              component={NotePage}
              isAuthenticated={AuthService.isAuthenticated}
              userId={AuthService.userId}
              Navbar={MyNavbar}
            />
            <PrivateRoute
              path="/Videos"
              component={VideoPage}
              isAuthenticated={AuthService.isAuthenticated}
              userId={AuthService.userId}
              Navbar={MyNavbar}
            />
            <Route
              exact
              path="/AboutUs"
              render={routeProps => (
                <AboutUsPage {...routeProps} Navbar={MyNavbar} />
              )}
            />
            <PrivateRoute
              path="/VideoNotes/:video_id"
              component={VideoNotesPage}
              isAuthenticated={AuthService.isAuthenticated}
              userId={AuthService.userId}
              Navbar={MyNavbar}
            />
            <Route
              exact
              path="/Login"
              render={routeProps => (
                <Login
                  {...routeProps}
                  onLogin={this.onLogin.bind(this)}
                  onCheckAuth={this.onCheckAuth.bind(this)}
                  isAuthenticated={isAuthenticated}
                />
              )}
            />
            ;
            <Route
              exact
              path="/CreateAccount"
              render={routeProps => (
                <CreateAccount
                  {...routeProps}
                  onCreateAccount={this.onCreateAccount.bind(this)}
                  onCheckAuth={this.onCheckAuth.bind(this)}
                  isAuthenticated={isAuthenticated}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={routeProps => (
                <HomePage {...routeProps} Navbar={MyNavbar} />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
