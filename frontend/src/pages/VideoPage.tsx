import React from "react";
import Box from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
import GetAppIcon from "@material-ui/icons/GetApp";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { styled as materialStyled } from "@material-ui/core/styles";
import { GREY_COLOR, RED_COLOR, PINK_COLOR } from "../colorConstants";
import Thumbnail from "../components/Thumbnail";
import { VideoType } from "../types";
import { getVideos } from "../api/videos";
import Link from '@material-ui/core/Link';
import Search from "../components/Search";


const USER_ID = 1;

const FontStyleComponent = materialStyled(Box)({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
});

const VideoStyledComponent = materialStyled(Box)({
  width: "400px",
  backgroundColor: PINK_COLOR,
});

const GreyFont = materialStyled(Box)({
  color: GREY_COLOR
});

interface Props {}

interface State {
  videos: Array<VideoType>;
  searched_videos: Array<VideoType>;
}

class VideoPage extends React.Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      videos: [],
      searched_videos: []
    };
  }

  getVideos = async () => {
    const response = await getVideos({ user_id: USER_ID });
    response && this.setState({ videos: response.videos, searched_videos: response.videos });
  };

  componentDidMount() {
    this.getVideos();
  }

  updateSearchedVideos(searched_videos: Array<VideoType>) {
    this.setState({searched_videos: searched_videos});
  }

  renderMain() {
    const numVideos = this.state.videos.length;
    if (numVideos) {
      return (
        <Box display="flex" flexWrap="wrap">
          {this.state.searched_videos.map(video => (
            <VideoStyledComponent key={video.video_id} m={1} display="flex" flexDirection="column" alignItems="center">
              <Thumbnail video_id={video.video_id} />
              <Box>{video.video_title}</Box>
              <Link href={`/VideoNotes/${video.video_id}`}>[View all notes]</Link>
            </VideoStyledComponent>
          ))}
        </Box>
      );
    }

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
          <Search components={this.state.videos} updateSearchedComponents={this.updateSearchedVideos.bind(this)} searchType="videos" />
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
