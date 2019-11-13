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
import { getCategories } from "../api/categories";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import { access } from "fs";

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
  categories: Array<string>;
  searched_videos: Array<VideoType>;
}

class CollectionPage extends React.Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      categories: [],
      searched_videos: []
    };
  }

  getCategories = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const userId: number = parseInt(localStorage.getItem("userId") as string);
    const response = await getCategories(
      { user_id: userId },
      accessToken as string
    );
    response &&
      this.setState({
        videos: response.categories,
        searched_videos: response.categories
      });
  };

  componentDidMount() {
    this.getCategories();
  }

  updateSearchedVideos(searched_videos: Array<VideoType>) {
    this.setState({ searched_videos: searched_videos });
  }

  renderMain() {
    const numCategories = this.state.categories.length;
    if (numCategories) {
      return (
        <Box display="flex" flexWrap="wrap">
          {this.state.searched_videos.map(video => (
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
          components={this.state.categories}
          updateSearchedComponents={this.updateSearchedVideos.bind(this)}
          searchType="categories"
        />
        <Box>
          <h3 style={{ color: RED_COLOR }}>Recent Videos</h3>
          {this.renderMain()}
        </Box>
      </FontStyleComponent>
    );
  }
}

export default CollectionPage;
