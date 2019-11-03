import * as React from "react";
import { SyntheticEvent } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect, RouteComponentProps, RouteProps } from "react-router-dom";
import Home from "./Home";
import Notes from "./Notes";
import Videos from "./Videos";
import backendapi from "../api/backendapi";

export const AuthService = {
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
  async authenticate(email: string, password: string, cb: Function) {
    const response = await backendapi.post('/login', {email, password})
    console.log(response);
    if (response.status === 200) {
        this.isAuthenticated = true;
        this.accessToken = response.data.accessToken;
        localStorage.setItem('accessToken', response.data.accessToken)
    }
    setTimeout(cb, 100)
  },
  logout(cb: Function) {
    this.isAuthenticated = false
    localStorage.removeItem('accessToken')
    setTimeout(cb, 100)
  }
};

interface PrivateRouteProps extends RouteProps {
  component: any;
  isAuthenticated: boolean;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;
  console.log("yo");
  console.log(AuthService.isAuthenticated);
  return (
      <Route
          {...rest}
          render={(routeProps) =>
              AuthService.isAuthenticated ? (
                  <Component {...rest} {...routeProps} />
              ) : (
                      <Redirect
                          to={{
                              pathname: '/',
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

  return (
      <Route
          {...rest}
          render={(routeProps) =><Login {...routeProps} />}
      />
  );
};

class App extends React.Component {


  render() {
    return (
        <Router>
            <div>    
                {/* <PrivateRoute path="/Notes"  /> */}
                <PrivateRoute path="/Home" component={Home} isAuthenticated={AuthService.isAuthenticated} />
                <PrivateRoute path="/Notes" component={Notes} isAuthenticated={AuthService.isAuthenticated} />
                <PrivateRoute path="/Videos" component={Videos} isAuthenticated={AuthService.isAuthenticated} />
                <PublicRoute exact path="/" />           
            </div>
        </Router>
    )
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
          this.setState({redirectToPreviousRoute: true});
      })
      console.log(this.state.email);
      console.log(this.state.password);
  };

  updateEmail = (event: SyntheticEvent) => {
      event.preventDefault();
      this.setState({email: (event.target as HTMLInputElement).value});
  }

  updatePassword = (event: SyntheticEvent) => {
      event.preventDefault();
      this.setState({password: (event.target as HTMLInputElement).value});
  }

  render() {

      const { from } = this.props.location.state || { from: { pathname: "/" } };
      const { redirectToPreviousRoute } = this.state;

      if (AuthService.isAuthenticated) {
          console.log("already logged in");
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
                  <form onSubmit={this.login} >
                      <div>
                          <div>
                              <div>
                              <i></i>
                              <input type="text" name="email" placeholder="email" onChange={this.updateEmail} />
                          </div>
                      </div>
                      <div>
                          <div>
                              <i></i>
                              <input type="password" name="password" placeholder="Password" onChange={this.updatePassword} />
                          </div>
                      </div>
                      <button>Login</button>
                  </div>
          
                  <div></div>
          
                  </form>
          
              
              </div>
          </div>
      )
  }
}

export default App;
