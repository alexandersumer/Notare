import * as React from "react";
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
  RouteComponentProps,
  Redirect
} from "react-router-dom";
import { RED_COLOR } from "../colorConstants";
import NotareCircle from "../NotareCircle.png";

interface LoginProps {
  onLogin: Function;
  onCheckAuth: Function;
  isAuthenticated: boolean;
}

interface LoginState {
  email: string;
  password: string;
  errorMessage: string;
}

class Login extends React.Component<
  RouteComponentProps & LoginProps,
  LoginState
> {
  constructor(props: RouteComponentProps & LoginProps, state: LoginState) {
    super(props, state);
    this.state = {
      email: "",
      password: "",
      errorMessage: ""
    };
  }

  login = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const response = await this.props.onLogin(this.state.email, this.state.password);
    if (response !== "") {
      this.setState({ errorMessage: response });
    } else {
      this.props.onCheckAuth();
    }
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
    if (this.props.isAuthenticated) {
      return <Redirect to="/Notes" />;
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
                  <Box>
                    <img width="35px" height="35px" src={NotareCircle} />
                  </Box>
                </Box>
                <Box p={1}>
                  {" "}
                  <Typography component="h1" variant="h5">
                    Log in
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
                    color="secondary"
                  >
                    Log in
                  </Button>
                </Box>
                <Grid container direction="column" alignItems="center">
                  <Grid item>
                    <p style={{ color: RED_COLOR }}>
                      {this.state.errorMessage}
                    </p>
                  </Grid>
                </Grid>
                <Grid container direction="column" alignItems="center">
                  <Grid item>
                    <br />
                    <Link href="/CreateAccount" variant="body1">
                      {"Don't have an account? Sign up"}
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

export default Login;
