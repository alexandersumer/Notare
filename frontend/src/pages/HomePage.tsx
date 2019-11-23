import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import { ORANGE_COLOR } from "../colorConstants";
import Container from "../components/Container";
import Typography from "@material-ui/core/Typography";


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
          <Box mt={5} display="flex" flexDirection="column" alignItems="center">
            <Box p={2} />
            <Typography variant="h2">
              What if you could take notes on YouTube?
            </Typography>
            <Box p={2} />
            <Box mt={3} style={{ color: ORANGE_COLOR }}>
              <h4>
                Meet Notare, a free Google Chrome extension made by sutdents to
                help make learning online easier.
              </h4>
            </Box>
            <Box mt={3}>
              <Button variant="contained" color="secondary">
                Try Notare Now <GetAppIcon />
              </Button>
            </Box>
            {/* <Box mt={6}>
              WARNING: May contain blood, sweat and tears from the following
              individuals:
            </Box>
            <Box>
              <b>
                Alexander Jones | Daniel Brockwell | Guy Segev | Mitchell
                Shelton
              </b>
            </Box> */}
          </Box>
        </Container>
      </Box>
    );
  }
}

export default HomePage;
