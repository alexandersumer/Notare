import * as React from "react";
import { styled as materialStyled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { PINK_COLOR } from "../colorConstants";
import NotareWord from "../NotareWord.png";
import { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
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

  render() {
    const { email, isAuthenticated } = this.props;
    let displayEmail = isAuthenticated ? email : "";

    var authButton;
    if (isAuthenticated) {
      authButton = <Button variant="contained" color="primary" onClick={this.logout}>Logout</Button>;
    } else {
      authButton = <Link to={`/Login`}><Button variant="contained" color="primary">Login</Button></Link>;
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
          {(this.props.isAuthenticated) && (<Box><Link to="/Notes">Notes</Link></Box>)}
          {(this.props.isAuthenticated) && (<Box><Link to="/Videos">Videos</Link></Box>)}
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
