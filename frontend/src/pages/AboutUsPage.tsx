import React from "react";
import Box from "@material-ui/core/Box";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Container from "../components/Container";

const ProfileImage = (name: string) => {
  return (
    <Box m={3} display="flex" flexDirection="column" alignItems="center">
      <Box>
        <AccountCircleIcon />
      </Box>
      <Box>{name}</Box>
    </Box>
  );
};

const names = [
  "Alexander Jones",
  "Daniel Brockwell",
  "Guy Segev",
  "Mitchell Shelton"
];

interface Props {
  Navbar: any;
}

class AboutUsPage extends React.Component<Props> {
  constructor(props: Props){
    super(props);
  }
  render() {
    return (
      <Box>
        {this.props.Navbar()}
        <Container>
          <Box mt={3} display="flex" flexDirection="column" alignItems="center">
            <Box>
              <h1>Who the heck are these guys?</h1>
            </Box>
            <Box display="flex" flexDirection="row">
              {names.map(ProfileImage)}
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}
export default AboutUsPage;
