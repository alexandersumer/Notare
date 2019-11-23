import React from "react";
import Box from "@material-ui/core/Box";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GitHubIcon from "@material-ui/icons/GitHub";
import Link from "@material-ui/core/Link";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Container from "../components/Container";
import Typography from "@material-ui/core/Typography";

const Profile = (profile: ProfileType) => {
  return (
    <Box m={3} display="flex" flexDirection="column" alignItems="center">
      <Box>
        <AccountCircleIcon />
      </Box>
      <Box p={1} />
      <Typography variant="h5" color="textPrimary">
        <Box>{profile.name}</Box>
      </Typography>
      <Typography color="textPrimary">
        <Box>{profile.description}</Box>
      </Typography>
      <Box p={1} />
      <Box
        mr={3}
        ml={3}
        display="flex"
        alignItems="center"
        style={{ whiteSpace: "nowrap" }}
      >
        <Box>
          <Link href={profile.gitLink} target="_blank">
            <GitHubIcon />
          </Link>
        </Box>
        <Box ml={2}>
          <Link href={profile.liLink} target="_blank">
            <LinkedInIcon />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

type ProfileType = {
  name: string;
  description: string;
  gitLink: string;
  liLink: string;
};

const profileInfo = [
  {
    name: "Alexander Jones",
    description: "Fullstack Developer",
    gitLink: "https://github.com/alexanderj2357",
    liLink: "https://www.linkedin.com/in/alexanderj2357/"
  },
  {
    name: "Daniel Brockwell",
    description: "UX Designer & Frontend Developer",
    gitLink: "https://github.com/Actom360",
    liLink: "https://www.linkedin.com/in/danielbrockwell/"
  },
  {
    name: "Guy Segev",
    description: "Frontend Developer",
    gitLink: "https://github.com/atiredturtle",
    liLink: "https://www.linkedin.com/in/guy-segev-98a27110a/"
  },
  {
    name: "Mitchell Shelton",
    description: "Fullstack Developer",
    gitLink: "https://github.com/armoured",
    liLink: "https://www.linkedin.com/in/mitchell-shelton/"
  }
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
            <Box p={2} />
            <Typography variant="h2">Who the heck are these guys?</Typography>
            <Box p={2} />
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
