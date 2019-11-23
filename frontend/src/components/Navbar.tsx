import * as React from "react";
import { styled as materialStyled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { RED_COLOR, CHARCOAL_COLOR, LIGHT_PINK_COLOR } from "../colorConstants";
import NotareWord from "../NotareWord.png";
import NotareCircle from "../NotareCircle.png";
import { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const FontStyleComponent = materialStyled(Box)({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
});

const NavBarStyledComponent = materialStyled(Box)({
  backgroundColor: LIGHT_PINK_COLOR,
  height: 70
});

const NavButton = materialStyled(Button)({
  fontSize: 17
});

interface Props {
  email: string;
  isAuthenticated: boolean;
  onLogout: () => Promise<void>;
}

class Navbar extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  logout = async (event: SyntheticEvent) => {
    event.preventDefault();
    await this.props.onLogout();
  };

  renderNavHome = () => {
    const route = this.props.isAuthenticated ? "/Notes" : "/";

    return (
      <Link to={route} style={{ textDecoration: "none" }}>
        <Box
          mr={3}
          ml={3}
          display="flex"
          alignItems="center"
          style={{ whiteSpace: "nowrap" }}
        >
          <Box>
            <img width="35px" height="35px" src={NotareCircle} />
          </Box>
          <Box ml={2}>
            <img width="96px" height="24px" src={NotareWord} />
          </Box>
        </Box>
      </Link>
    );
  };

  renderNavLink = (
    pathname: string,
    text: string,
    needsAuth: boolean = true
  ) => {
    if (this.props.isAuthenticated || !needsAuth) {
      if (window.location.pathname !== pathname) {
        return (
          <Link to={pathname} style={{ textDecoration: "none" }}>
            <NavButton color="secondary"><div style={{color: CHARCOAL_COLOR}}>{text}</div></NavButton>
          </Link>
        );
      } else {
        return (
          <Box>
            <Link to={pathname} style={{ textDecoration: "none" }}>
              <NavButton color="secondary"><div style={{color: RED_COLOR}}>{text}</div></NavButton>
            </Link>
          </Box>
        );
      }
    }
    return null;
  };

  renderNavAuth = () => {
    const route = this.props.isAuthenticated ? "/Notes" : "/";

    if (this.props.isAuthenticated) {
      return (
        <Button variant="contained" color="secondary" onClick={this.logout}>
          Log out
        </Button>
      );
    } else {
      return (
        <Box
          mr={3}
          display="flex"
          alignItems="center"
          style={{ whiteSpace: "nowrap" }}
        >
          <Box ml={3}>
            <Link to={`/Login`}>
              <Button variant="contained" color="secondary">
                Log in
              </Button>
            </Link>
          </Box>
          <Box ml={3}>
            <Link to={`/CreateAccount`}>
              <Button variant="contained">
                Sign up
              </Button>
            </Link>
          </Box>
        </Box>
      );
    }
  };

  render() {
    const { email, isAuthenticated } = this.props;
    let displayEmail = isAuthenticated ? email : "";

    return (
      <FontStyleComponent>
        <NavBarStyledComponent
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {this.renderNavHome()}
          {this.renderNavLink("/Notes", "Notes")}
          {this.renderNavLink("/Videos", "Videos")}
          {this.renderNavLink("/AboutUs", "About Us", false)}

          <Box
            mr={3}
            display="flex"
            alignItems="center"
            style={{ whiteSpace: "nowrap" }}
          >
            <Typography color="textPrimary">{displayEmail}</Typography>
            <Box ml={3}>{this.renderNavAuth()}</Box>
          </Box>
        </NavBarStyledComponent>
      </FontStyleComponent>
    );
  }
}

export default Navbar;
