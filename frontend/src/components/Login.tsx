import * as React from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
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

interface LoginProps {
  onLogin: Function;
  isAuthenticated: boolean;
}
interface LoginState {
  email: string;
  password: string;
}

class Login extends React.Component<
  RouteComponentProps & LoginProps,
  LoginState
> {
  constructor(props: RouteComponentProps & LoginProps, state: LoginState) {
    super(props, state);
    this.state = {
      email: "",
      password: ""
    };
  }

  login = (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.props.onLogin(this.state.email, this.state.password);
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

export default Login;
