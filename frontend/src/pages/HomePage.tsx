import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import { CHARCOAL_COLOR } from "../colorConstants";
import Container from "../components/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Demo from "../Demo.png";

export const Home = () => <h1></h1>;

interface Props {
  Navbar: any;
}

class HomePage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Box>
        {this.props.Navbar()}
        <Container>
          <Box mt={4} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3">
              What if you could take notes on YouTube?
            </Typography>
            <Box p={1} />
            <Box>
              <img width="910px" height="405px" src={Demo} />
            </Box>
            <Box p={1} />
            <Box mt={1} style={{ color: CHARCOAL_COLOR }}>
              <h4>
                Meet <b>Notare</b>, a <b>free Google Chrome extension</b> made
                by students to help <b>make learning online easier</b>.
              </h4>
            </Box>
            <Box mt={1}>
              <Link
                href={"https://github.com/alexanderj2357/Notare/"}
                target="_blank"
              >
                <Button variant="contained" color="secondary">
                  Try Notare Now <GetAppIcon />
                </Button>
              </Link>
            </Box>
          </Box>
          <Box p={5} />
        </Container>
      </Box>
    );
  }
}

export default HomePage;
