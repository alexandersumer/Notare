import * as React from "react";
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
  RouteComponentProps,
  Redirect
} from "react-router-dom";

interface CreateProps {
  onCreateAccount: Function;
  isAuthenticated: boolean;
}
interface CreateState {
  email: string;
  password: string;
}

class CreateAccount extends React.Component<RouteComponentProps & CreateProps, CreateState> {
  constructor(props: RouteComponentProps & CreateProps, state: CreateState){
    super(props, state);
    this.state = {
        email: "",
        password: "",
    };
  }

  createAccount = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.onCreateAccount(email, password);
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
              <form noValidate onSubmit={this.createAccount.bind(this)}>
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
                    <Link href="/Login" variant="body1">
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

export default CreateAccount;