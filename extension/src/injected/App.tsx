import * as React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import { login, logout } from "../api/login";
import NoteTakingBox from "./NotetakingBox";
import AuthService from "../utils/AuthService";
import { styled as materialStyled } from "@material-ui/core/styles";
import { BACKGROUND_COLOR } from "../colorConstants";
import { DOMAIN_URL } from "../constants";

interface Props {
  video: HTMLMediaElement;
}

interface State {
  emailTextBox: string;
  password: string;
  isAuthenticated: boolean;
  email: string;
}

const StyledWrapper = materialStyled(Box)({
  background: BACKGROUND_COLOR,
  fontSize: 20,
  height: 500,
  width: 300,
  padding: 20,
});

export default class NoteItem extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);
  }
  state = {
    emailTextBox: "",
    password: "",
    isAuthenticated: false,
    email: "",
  };

  login = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await AuthService.authenticate(this.state.emailTextBox, this.state.password);
    const isAuthenticated = AuthService.isAuthenticated;
    const email = await AuthService.email();
    if (isAuthenticated) this.setState({ isAuthenticated: true , email});
  };

  handleEmailChange = (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.setState({ emailTextBox: (event.target as HTMLInputElement).value });
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
        <Box mt={1} style={{ fontSize: 15 }}>Log in to your Notare account</Box>
        <Box mt={2} style={{ width: 200}} >
          <TextField
            label="Email"
            variant="filled"
            onChange={this.handleEmailChange}
            fullWidth
          />
        </Box>
        <Box mt={2} style={{ width: 200}} >
          <TextField
            type="password"
            label="Password"
            variant="filled"
            onChange={this.handlePasswordChange}
            onKeyDown={this.handlePasswordKeydown}
            fullWidth
          />
        </Box>
        <Box mt={2}>
          <Button onClick={this.login} variant="contained">
            Log in
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" mt={2} justifyContent="center" style={{ fontSize: 14, textAlign: "center" }}>
          Don't have an account?
          <Link href={DOMAIN_URL+":3000"} target="_blank">Sign up here</Link>
        </Box>
      </Box>
    );
  };

  async componentDidMount() {
    const isAuthenticated = await AuthService.isAuthenticated();
    const email = await AuthService.email();
    this.setState({ isAuthenticated, email });
  }

  render() {
    return (
      <StyledWrapper>
        <Box display="flex">
          <Box display="flex" justifyContent="left">
              <Link href={DOMAIN_URL + ":3000"} target="_blank">
              <img
                width={"30px"}
                height={"30px"}
                src={chrome.runtime.getURL("NotareCircleTransparent.png")}
              />
            </Link>
          </Box>
          <Box flexGrow={1} />
          
          {this.state.isAuthenticated && (
            <Box display="flex" justifyContent="right" flexDirection="column" style={{fontSize: 12, textAlign: "right"}}>
              <Box>{this.state.email}</Box>
              <Box mr={1}>
                <Link style={{ cursor: "pointer"}} onClick={() => this.onLogout()}>Log out</Link>
              </Box>
            </Box>
          )}
        </Box>
        {this.renderMain()}
      </StyledWrapper>
    );
  }
}
