import React from "react";
import Box from "@material-ui/core/Box";
import GetAppIcon from "@material-ui/icons/GetApp";
import Button from "@material-ui/core/Button";
import { styled as materialStyled } from "@material-ui/core/styles";
import { GREY_COLOR, RED_COLOR, PINK_COLOR } from "../colorConstants";
import Thumbnail from "../components/Thumbnail";
import { VideoType } from "../types";
import { getVideos } from "../api/videos";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import Navbar from "../components/Navbar";

const FontStyleComponent = materialStyled(Box)({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
});

const VideoStyledComponent = materialStyled(Box)({
  width: "400px",
  backgroundColor: PINK_COLOR
});

const GreyFont = materialStyled(Box)({
  color: GREY_COLOR
});

interface Props {}

interface State {
  category: string
  videos: Array<VideoType>;
  category_videos: Array<VideoType>;
}

class CategoryVideosPage extends React.Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      category: "",
      videos: [],
      category_videos: []
    };
  }

  getVideos = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const userId: number = parseInt(localStorage.getItem("userId") as string);
    const response = await getVideos(
      { sort: "-last_edited", user_id: userId },
      accessToken as string
    );
    response &&
      this.setState({
        videos: response.videos,
        category_videos: response.videos
      });
  };

  componentDidMount() {
    this.getVideos();
  }

  updateSearchedVideos(category_videos: Array<VideoType>) {
    this.setState({ category_videos: category_videos });
  }

  renderMain() {
    const numVideos = this.state.videos.length;
    if (numVideos) {
      return (
        <Box display="flex" flexWrap="wrap">
          {this.state.category_videos.map(video => (
            <VideoStyledComponent
              key={video.video_id}
              m={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Thumbnail video_id={video.video_id} />
              <Box>{video.video_title}</Box>
              <Link to={`/VideoNotes/${video.video_id}`}>[View all notes]</Link>
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
        <Navbar />
        <Search
          components={this.state.videos}
          updateSearchedComponents={this.updateSearchedVideos.bind(this)}
          searchType="videos"
        />
        <Box>
          <h3 style={{ color: RED_COLOR }}>Videos</h3>
          {this.renderMain()}
        </Box>
      </FontStyleComponent>
    );
  }
}

export default CategoryVideosPage;
