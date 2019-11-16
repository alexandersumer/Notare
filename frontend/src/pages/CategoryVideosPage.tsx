import React from "react";
import Box from "@material-ui/core/Box";
import GetAppIcon from "@material-ui/icons/GetApp";
import Button from "@material-ui/core/Button";
import { styled as materialStyled } from "@material-ui/core/styles";
import { GREY_COLOR, RED_COLOR, PINK_COLOR } from "../colorConstants";
import { VideoType } from "../types";
import { getVideos } from "../api/videos";
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import { getCategories, changeVideoCategory } from "../api/categories";
import { RouteComponentProps } from "react-router-dom";
import VideoComponent from "../components/Video";

const FontStyleComponent = materialStyled(Box)({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
});

const GreyFont = materialStyled(Box)({
  color: GREY_COLOR
});

interface MatchParams {
  category: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

interface State {
  categories: Array<string>;
  category: String;
  videos: Array<VideoType>;
  searched_videos: Array<VideoType>;
}

class CategoryVideosPage extends React.Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      categories: [],
      category: "",
      videos: [],
      searched_videos: []
    };
  }

  getVideos = async () => {
    const response = await getVideos({ sort: "-last_edited" });

    if (response) {
      const { category } = this.props.match.params;
      const videos = response.videos.filter(video => {
        return video.categories === category;
      });
      this.setState({
        videos: videos,
        searched_videos: videos
      });
    }
  };

  getCategories = async () => {
    const response = await getCategories();
    response &&
      this.setState({
        categories: response.tags,
      })
  };

  componentDidMount() {
    this.getVideos();
    this.getCategories();
  }

  updateSearchedVideos(searched_videos: Array<VideoType>) {
    this.setState({ searched_videos: searched_videos });
  }

  async onChangeCategory( video_id: string, category: string){
    await changeVideoCategory({tag: category}, video_id);
    await this.getVideos();
  }

  renderMain() {
    const numVideos = this.state.videos.length;
    if (numVideos) {
      return (
        <Box p={1} display="flex" flexWrap="wrap">
          {this.state.searched_videos.map(video => (
              <VideoComponent key={video.video_id} video={video} categories={this.state.categories} onChangeCategory={this.onChangeCategory.bind(this)}/>
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
    const { category } = this.props.match.params;

    return (
      <FontStyleComponent p={3}>
        <Navbar />
        <Search
          components={this.state.videos}
          updateSearchedComponents={this.updateSearchedVideos.bind(this)}
          searchType="videos"
        />
        <Box>
          <h3 style={{ color: RED_COLOR }}>Videos for {category}</h3>
          {this.renderMain()}
        </Box>
      </FontStyleComponent>
    );
  }
}

export default CategoryVideosPage;
