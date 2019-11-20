import * as React from "react";
import styled from "styled-components";
import { login, logout } from "../api/login";
import NoteTakingBox from "./NotetakingBox";
import AuthService from "../utils/AuthService";
import { BACKGROUND_COLOR } from "../colorConstants";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { DOMAIN_URL } from "../constants";

interface Props {
  video: HTMLMediaElement;
}

interface State {
  email: string;
  password: string;
  isAuthenticated: boolean;
}

const StyledWrapper = styled.div`
  background-color: ${BACKGROUND_COLOR};
  font-size: 20px;
  height: 500px;
  width: 300px;
  padding: 20px;
`;

export default class NoteItem extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);
  }
  state = {
    email: "",
    password: "",
    isAuthenticated: false
  };

  login = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await AuthService.authenticate(this.state.email, this.state.password);
    const isAuthenticated = AuthService.isAuthenticated;
    if (isAuthenticated) this.setState({ isAuthenticated: true });
  };

  handleEmailChange = (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.setState({ email: (event.target as HTMLInputElement).value });
  };

  handlePasswordKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode == 13 && event.shiftKey == false) {
      this.login(event);
    }
  };

  handlePasswordChange = (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.setState({ password: (event.target as HTMLInputElement).value });
  };

  onLogout = async () => {
    console.log("Logging out");
    try {
      await logout();
    } finally {
      await AuthService.logout(); // delete from storage
      this.setState({ isAuthenticated: false });
    }
  };
  renderMain = () => {
    if (this.state.isAuthenticated) {
      return <NoteTakingBox video={this.props.video} />;
    }
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box p={1}>
          <h3>Log in to your account</h3>
        </Box>
        <Box p={1}>
          <TextField
            label="Email"
            variant="filled"
            onChange={this.handleEmailChange}
          />
        </Box>
        <Box p={1}>
          <TextField
            type="password"
            label="Password"
            variant="filled"
            onChange={this.handlePasswordChange}
            onKeyDown={this.handlePasswordKeydown}
          />
        </Box>
        <Box>
          <Button onClick={this.login} variant="contained">
            Log in
          </Button>
        </Box>
        <Box p={1}>
          <h3>Don't have an account? Sign up HERE</h3>
        </Box>
      </Box>
    );
  };

  async componentDidMount() {
    console.log("Injected is mounted!");
    const isAuthenticated = await AuthService.isAuthenticated();
    console.log("isAuthenticaed = ", isAuthenticated);
    this.setState({ isAuthenticated });
  }

  render() {
    console.log(`is authenticate ${this.state.isAuthenticated}`);
    return (
      <StyledWrapper>
        <Box display="flex" mb={1}>
          {this.state.isAuthenticated && (
            <button onClick={() => this.onLogout()}>Log out</button>
          )}
          <Box display="flex" justifyContent="left">
              <img
                width={"120px"}
                height={"30px"}
                src={chrome.runtime.getURL("NotareWord.png")}
              />
          </Box>
          <Box flexGrow={1} />
          <Box display="flex" justifyContent="right">
            <Link href={DOMAIN_URL+":3000"} target="_blank">
            <img
              width={"30px"}
              height={"30px"}
              src={chrome.runtime.getURL("NotareCircleTransparent.png")}
            />
            </Link>
          </Box>
        </Box>
        {this.renderMain()}
      </StyledWrapper>
    );
  }
}
