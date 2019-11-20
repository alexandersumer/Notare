import * as React from "react";
import { styled as materialStyled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { PINK_COLOR } from "../colorConstants";
import NotareWord from "../NotareWord.png";
import { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const FontStyleComponent = materialStyled(Box)({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
});

const NavBarStyledComponent = materialStyled(Box)({
  backgroundColor: PINK_COLOR,
  height: 70
});

const NoOutlineButton = materialStyled(Button)({
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
      <Box ml={3}>
        <Link to={route} style={{ textDecoration: "none" }}>
          <img width="120px" height="30px" src={NotareWord} />
        </Link>
      </Box>
    );
  };

  renderNavLink = (
    pathname: string,
    text: string,
    needsAuth: boolean = true
  ) => {
    const color =
      window.location.pathname !== pathname ? "primary" : "secondary";
    if (this.props.isAuthenticated || !needsAuth) {
      return (
        <Link to={pathname} style={{ textDecoration: "none" }}>
          <NoOutlineButton color={color}>{text}</NoOutlineButton>
        </Link>
      );
    }
    return null;
  };

  render() {
    const { email, isAuthenticated } = this.props;
    let displayEmail = isAuthenticated ? email : "";

    var authButton;
    if (isAuthenticated) {
      authButton = (
        <Button variant="contained" color="primary" onClick={this.logout}>
          Logout
        </Button>
      );
    } else {
      authButton = (
        <Link to={`/Login`}>
          <Button variant="contained" color="primary">
            Login
          </Button>
        </Link>
      );
    }

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
            <Box ml={3}>{authButton}</Box>
          </Box>
        </NavBarStyledComponent>
      </FontStyleComponent>
    );
  }
}

export default Navbar;
