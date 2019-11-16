import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  makeStyles,
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
import { SyntheticEvent } from "react";
import HomePage from "./HomePage";
import AboutUsPage from "./AboutUsPage";
import NotePage from "./NotePage";
import VideoPage from "./VideoPage";
import CollectionPage from "./CollectionPage";
import VideoNotesPage from "./VideoNotesPage";
import { postLogin } from "../api/login";
import CategoryVideosPage from "./CategoryVideosPage";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.primary.light
    }
  },
  card: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius
  }
}));

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

    const classes = useStyles();

    return (
      <Container component="main" maxWidth="sm">
        <Box boxShadow={3} className={classes.card}>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form noValidate onSubmit={this.login}>
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
              onChange={this.updateEmail}
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
              onChange={this.updateEmail}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign In
            </Button>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <br />
                <Link href="/register" variant="body1">
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    );
  }
}

export default App;
