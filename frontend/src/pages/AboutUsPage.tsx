import React from "react";
import Box from "@material-ui/core/Box";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Container from "../components/Container";

const Profile = (profile: ProfileType) => {
  return (
    <Box m={3} display="flex" flexDirection="column" alignItems="center">
      <Box>
        <AccountCircleIcon/>
      </Box>
      <Box>{profile.name}</Box>
      <Box>{profile.description}</Box>
      <Box>
        <GitHubIcon/>
      </Box>
      <Box>
        <LinkedInIcon/>
      </Box>
    </Box>
  );
};

type ProfileType = {
  name: string,
  description: string,
}

const profileInfo = [
  {
    name: "Alexander Jones",
    description: "Backend Developer | Software Engineering Intern @ Atlassian"
  },
  {
    name: "Daniel Brockwell",
    description: "UX Designer & Front-End Developer | Account Executive @ Uber",
  },
  {
    name: "Guy Segev",
    description: "Backend Developer | Backend & DevOps Engineer @ Fitsense"
  },
  {
    name: "Mitchell Shelton",
    description: "Fullstack Developer | Freelance Developer"
  }
];

const gitLinks = [
  "https://github.com/alexanderj2357",
  "https://github.com/Actom360",
  "https://github.com/atiredturtle",
  "https://github.com/armoured"
];

const liLinks = [
"https://www.linkedin.com/in/alexanderj2357/",
"https://www.linkedin.com/in/danielbrockwell/",
"https://www.linkedin.com/in/guy-segev-98a27110a/",
"https://www.linkedin.com/in/mitchell-shelton/"
];

interface Props {
  Navbar: any;
}

class AboutUsPage extends React.Component<Props> {
  constructor(props: Props) {
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
              {profileInfo.map(Profile)}
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}
export default AboutUsPage;
