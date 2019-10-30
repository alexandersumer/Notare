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
  // tslint:disable-next-line:no-any
  component: any;
  //isAuthenticated: boolean;
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

// function PublicRoute({ component: Component, ...rest}) {
//   //console.log({...rest});

//   return (
//       <Route 
//       {...rest}
//       render={props => <Login {...rest} {...props} />}
//       />
//   )
// }


// function PrivateRoute({ component: React.Component, ...rest}) {

//   //console.log({...rest});

//   return (
//       <Route 
//       {...rest}
//       render={props => AuthService.isAuthenticated ? (
//           <StatusBoard {...rest} {...props} />
//           ): (
//           <Redirect 
//               to={{pathname:"/",
//                    state: { from: props.location }
//               }}
//           />
//           )
//       }
//       />
//   )
// }

class App extends React.Component {


  render() {
    return (
        <Router>
            <div>    
                {/* <PrivateRoute path="/Notes"  /> */}
                <PrivateRoute path="/Home" component={Home} />
                <PrivateRoute path="/Notes" component={Notes} />
                <PrivateRoute path="/Videos" component={Videos} />
                <PublicRoute exact path="/" />           
            </div>
        </Router>
    )
  }

  // render() {
  //   return (
  //     <Router>
  //       <div>
  //         <nav>
  //           <Link to="/">Home</Link>
  //           <Link to="/Notes">Notes</Link>
  //           <Link to="/Videos">Videos</Link>
  //         </nav>
  //         <Switch>
  //           <Route exact path="/" component={Home} />
  //           <Route exact path="/Notes" component={Notes} />
  //           <Route exact path="/Videos" component={Videos} />
  //         </Switch>
  //       </div>
  //     </Router>
  //   );
  // }
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
      // console.log(this.state.email);
  }

  updatePassword = (event: SyntheticEvent) => {
      event.preventDefault();
      this.setState({password: (event.target as HTMLInputElement).value});
      // console.log(this.state.password);
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
          <div className="ui middle aligned center aligned grid">
              <div className="column">
                  <h2 className="ui teal image header">
                      <div className="content">Log-in to your account</div>
                  </h2>
                  <form className="ui large form" onSubmit={this.login} >
                      <div className="ui stacked segment">
                          <div className="field">
                              <div className="ui left icon input">
                              <i className="user icon"></i>
                              <input type="text" name="email" placeholder="email" onChange={this.updateEmail} />
                          </div>
                      </div>
                      <div className="field">
                          <div className="ui left icon input">
                              <i className="lock icon"></i>
                              <input type="password" name="password" placeholder="Password" onChange={this.updatePassword} />
                          </div>
                      </div>
                      <button className="ui fluid large teal submit button" >Login</button>
                  </div>
          
                  <div className="ui error message"></div>
          
                  </form>
          
              
              </div>
          </div>
      )
  }
}

export default App;
