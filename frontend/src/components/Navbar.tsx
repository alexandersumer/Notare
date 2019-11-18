import * as React from "react";
import { styled as materialStyled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { PINK_COLOR } from "../colorConstants";
import NotareWord from "../NotareWord.png";
import { AuthService } from "../pages/App";
import { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { Logout } from "../api/auth";
import Button from '@material-ui/core/Button';

const FontStyleComponent = materialStyled(Box)({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
});

const NavBarStyledComponent = materialStyled(Box)({
  backgroundColor: PINK_COLOR,
  height: 70
});

interface Props {
  email: string;
}

interface State {
  logged_out: boolean;
}

class Navbar extends React.Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      logged_out: false
    };
  }

  logout = async (event: SyntheticEvent) => {
    event.preventDefault();
    Logout(); // backend logout
    AuthService.logout(() => {}); //frontend logout
    this.setState({ logged_out: true });
  };

  render() {
    const { email } = this.props;
    let displayEmail = "";
    if (!this.state.logged_out) {
      displayEmail = email
    }

    var authButton;
    if (this.state.logged_out) {
      authButton = <Link to={`/Login`}><Button variant="contained" color="primary">Login</Button></Link>;
    } else {
      authButton = <Button variant="contained" color="primary" onClick={this.logout}>Logout</Button>;
    }

    return (
      <FontStyleComponent>
        <NavBarStyledComponent
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box ml={3}>
            <Link to="/">
              <img width="120px" height="30px" src={NotareWord} />
            </Link>
          </Box>
          <Box>
            <Link to="/Notes">Notes</Link>
          </Box>
          <Box>
            <Link to="/Videos">Videos</Link>
          </Box>
          <Box mr={3}>
            <Link to="/AboutUs">About Us</Link>
          </Box>
          <Box mr={3}>
            <Box mr={3} p={0.5}>
              {displayEmail}
            </Box>
            <Box mr={3} p={0.5}>
              {authButton}
            </Box>
          </Box>
        </NavBarStyledComponent>
      </FontStyleComponent>
    );
  }
}

export default Navbar;
