import * as React from "react";
import { styled as materialStyled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { ORANGE_COLOR } from "../colorConstants";
import { PINK_COLOR } from "../colorConstants";
import NotareWord from "../NotareWord.png";
import { AuthService } from "../pages/App";
import { SyntheticEvent } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect, RouteComponentProps, RouteProps } from "react-router-dom";
import { Logout } from "../api/logout";

const FontStyleComponent = materialStyled(Box)({
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  });

const NavBarStyledComponent = materialStyled(Box)({
    backgroundColor: PINK_COLOR,
    height: 70
});

interface Props {}

interface State {
    logged_out: boolean;
}


class Navbar extends React.Component<Props> {
    state: State;
    constructor(props: Props) {
      super(props);
      this.state = {
        logged_out: false
      }
    }

    logout = async (event: SyntheticEvent) => {
        event.preventDefault();
        const accessToken: string = localStorage.getItem("accessToken") as string;
        console.log(accessToken);
        Logout(accessToken); // backend logout
        AuthService.logout(() => {}); //frontend logout
        this.setState({logged_out: true});
    };

    render() {

        if (this.state.logged_out) {
            console.log("logging out");
            return <Redirect to={"/"} />;
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
                  <Link to="/Home">
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
                  <Link to="/AboutUs">About us</Link>
                </Box>
                <Box mr={3}>
                  <button onClick={this.logout}>Logout</button>
                </Box>
              </NavBarStyledComponent>
          </FontStyleComponent>
        )
    }
}

export default Navbar;