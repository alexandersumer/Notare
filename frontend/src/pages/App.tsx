import * as React from "react";
import { SyntheticEvent } from "react";
import HomePage from "./HomePage";
import AboutUsPage from "./AboutUsPage";
import NotePage from "./NotePage";
import VideoPage from "./VideoPage";
import CollectionPage from "./CollectionPage";
import VideoNotesPage from "./VideoNotesPage";
import { postLogin, postCreateAccount } from "../api/auth";
import CategoryVideosPage from "./CategoryVideosPage";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AddBoxOutlined from "@material-ui/icons/AddBoxOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
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
  async createAccount(email: string, password: string, cb: Function) {
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

const CreateAccountRoute = (props: RouteProps) => {
  const { component: Component, ...rest } = props;

  return (
    <Route {...rest} render={routeProps => <CreateAccount {...routeProps} />} />
  );
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
              path="/Collections"
              component={CollectionPage}
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
            <CreateAccountRoute exact path="/CreateAccount" />
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

  updateEmail = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    this.setState({ email: event.target.value });
  };

  updatePassword = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    this.setState({ password: event.target.value });
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
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid alignItems="center" justify="center" item xs={4}>
          <Container component="main" maxWidth="sm">
            <Box boxShadow={3} p={2}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: "1vh" }}
              >
                <Box p={1}>
                  {" "}
                  <Avatar>
                    <LockOutlinedIcon />
                  </Avatar>
                </Box>
                <Box p={1}>
                  {" "}
                  <Typography component="h1" variant="h5">
                    Login
                  </Typography>
                </Box>
              </Grid>
              <form noValidate onSubmit={this.login.bind(this)}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  type="text"
                  autoFocus
                  onChange={this.updateEmail.bind(this)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.updatePassword.bind(this)}
                />
                <Box p={1}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Sign In
                  </Button>
                </Box>
                <Grid container direction="column" alignItems="center">
                  <Grid item>
                    <br />
                    <Link href="/CreateAccount" variant="body1">
                      {"Don't have an account? Register"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Container>
        </Grid>
      </Grid>
    );
  }
}

class CreateAccount extends React.Component<RouteComponentProps> {
  state = {
    redirectToPreviousRoute: false,
    email: "",
    password: ""
  };

  login = (event: SyntheticEvent) => {
    event.preventDefault();
    AuthService.createAccount(this.state.email, this.state.password, () => {
      this.setState({ redirectToPreviousRoute: true });
    });
  };

  updateEmail = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    this.setState({ email: event.target.value });
  };

  updatePassword = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    this.setState({ password: event.target.value });
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
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid alignItems="center" justify="center" item xs={4}>
          <Container component="main" maxWidth="sm">
            <Box boxShadow={3} p={2}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: "1vh" }}
              >
                <Box p={1}>
                  {" "}
                  <Avatar>
                    <AddBoxOutlined />
                  </Avatar>
                </Box>
                <Box p={1}>
                  {" "}
                  <Typography component="h1" variant="h5">
                    Create Account
                  </Typography>
                </Box>
              </Grid>
              <form noValidate onSubmit={this.login.bind(this)}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  type="text"
                  autoFocus
                  onChange={this.updateEmail.bind(this)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.updatePassword.bind(this)}
                />
                <Box p={1}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Register
                  </Button>
                </Box>
                <Grid container direction="column" alignItems="center">
                  <Grid item>
                    <br />
                    <Link href="/" variant="body1">
                      {"Already have an account? Login"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Container>
        </Grid>
      </Grid>
    );
  }
}

export default App;
