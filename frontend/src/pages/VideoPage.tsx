import React from "react";
import Box from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
import GetAppIcon from "@material-ui/icons/GetApp";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { styled as materialStyled } from "@material-ui/core/styles";
import { GREY_COLOR, RED_COLOR, PINK_COLOR } from "../colorConstants";
import Thumbnail from "../components/Thumbnail";
import { NoteType } from "../types";
import { getVideos } from "../api/videos"

const FontStyleComponent = materialStyled(Box)({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
});

const TestVideoComp = materialStyled(Box)({
  width: "400px",
  height: "100px",
  backgroundColor: PINK_COLOR
});

const GreyFont = materialStyled(Box)({
  color: GREY_COLOR
});

interface Props {}

interface State {
  videos: Array<NoteType>;
}

class VideoPage extends React.Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      videos: []
    };
  }

  getVideos = async () => {
    const videos = await getVideos({user_id: 1});
    this.setState({ videos });
  };

  componentDidMount() {
    this.getVideos();
  }

  renderMain() {
    const numVideos = this.state.videos.length;
    if (numVideos) {
      return (
        <Box display="flex" flexWrap="wrap">
          {this.state.videos.map(video => (
            <TestVideoComp key={video.video_id} m={1}>
              {video.video_title}
              <Thumbnail video_id={video.video_id} />
            </TestVideoComp>
          ))}
        </Box>
      );
    }

    const TryNotareBox = materialStyled(Box)({
      width: "300px",
      height: "60px",
      backgroundColor: RED_COLOR,
      color: "white"
    });

    return (
      <GreyFont
        display="flex"
        style={{ height: "100%" }}
        alignItems="center"
        flexDirection="center"
        justifyContent="center"
      >
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <Box>Looks like you have no videos yet!</Box>
          <Box mt={4}>
            Make sure to install the Chrome extension and head to Youtube to get
            started.
          </Box>
          <Box mt={3}>
            <Button variant="contained" color="secondary">
              Try Notare Now <GetAppIcon />
            </Button>
          </Box>
        </Box>
      </GreyFont>
    );
  }

  render() {
    return (
      <FontStyleComponent p={3}>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Box mr={4}>
            <h1>My Videos</h1>
          </Box>
          <Box mr={2}>
            <SearchIcon />
          </Box>
          <TextField
            style={{ width: "600px" }}
            type="search"
            margin="normal"
            label="Search by video name..."
          />
        </Box>
        <Box>
          <h3 style={{ color: RED_COLOR }}>Recent Videos</h3>
          {this.renderMain()}
        </Box>
      </FontStyleComponent>
    );
  }
}

export default VideoPage;
