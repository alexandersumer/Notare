import React from "react";
import Box from "@material-ui/core/Box";
import { styled as materialStyled } from "@material-ui/core/styles";
import { DARK_GREY_COLOR, RED_COLOR, LIGHT_PINK_COLOR } from "../colorConstants";
import { VideoType } from "../types";
import { getVideos } from "../api/videos";
import {
  addCategory,
  getCategories,
  deleteCategory,
  changeVideoCategory
} from "../api/categories";
import { sortStringArray } from "../utils/stringUtils";
import CategoryLabel from "../components/CategoryLabel";
import AddCategory from "../components/AddCategory";
import Button from "react-bootstrap/Button";
import Search from "../components/Search";
import VideoComponent from "../components/Video";
import Container from "../components/Container";

const GreyFont = materialStyled(Box)({
  color: DARK_GREY_COLOR
});

interface Props {
  Navbar: any;
}

interface State {
  videos: Array<VideoType>;
  searchedVideos: Array<VideoType>;
  categories: Array<string>;
  selectedCategories: Array<string>;
  deleteMode: boolean;
}

class VideoPage extends React.Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      videos: [],
      searchedVideos: [],
      categories: [],
      selectedCategories: [],
      deleteMode: false
    };
  }

  getVideos = async () => {
    const response = await getVideos({ sort: "-last_edited" });
    response &&
      this.setState({
        videos: response.videos,
        searchedVideos: response.videos
      });
  };

  getCategories = async () => {
    const response = await getCategories();
    response && this.setState({ categories: response.tags });
  };

  onChangeCategory = async (video_id: string, category: string) => {
    await changeVideoCategory({ tag: category }, video_id);
    await this.getVideos();
  };

  async componentDidMount() {
    await this.getVideos();
    await this.getCategories();
  }

  updateSearchedVideos(searchedVideos: Array<VideoType>) {
    this.setState({ searchedVideos: searchedVideos });
  }

  onDeselectCategory(category: string) {
    this.setState((state: State) => {
      const newSelected = state.selectedCategories.filter(c => c !== category);
      return {
        selectedCategories: newSelected
      };
    });
  }

  onSelectCategory(category: string) {
    if (!this.state.selectedCategories.includes(category)) {
      this.setState((state: State) => {
        const newSelected = [...state.selectedCategories, category];
        return {
          selectedCategories: newSelected
        };
      });
    }
  }

  onToggleDeleteMode(e: any) {
    this.setState((state: State) => ({
      deleteMode: !state.deleteMode
    }));
  }

  async onAddNewCategory(category: string) {
    await addCategory({ tag: category });
    await this.getCategories();
  }

  async onDeleteCategory(category: string) {
    await deleteCategory({ tag: category });
    await this.getCategories();
    await this.getVideos();
  }

  renderCategoryLabels() {
    const { categories, selectedCategories, deleteMode } = this.state;
    return (
      <Box>
        <Box display="flex" flexDirection="row">
          <Box mb={1}>
            <h4 style={{ color: DARK_GREY_COLOR }}>Your Categories</h4>
          </Box>
          <Box ml={2}>
            <Button
              size="sm"
              variant={deleteMode ? "success" : "secondary"}
              onClick={this.onToggleDeleteMode.bind(this)}
            >
              {deleteMode ? "Finish Deleting" : "Delete Categories"}
            </Button>
          </Box>
        </Box>

        <Box display="flex" flexDirection="row" alignItems="center">
          {sortStringArray(categories).map(category => (
            <CategoryLabel
              key={category}
              category={category}
              deleteMode={deleteMode}
              selected={selectedCategories.includes(category)}
              onSelectCategory={this.onSelectCategory.bind(this)}
              onDeselectCategory={this.onDeselectCategory.bind(this)}
              onDeleteCategory={this.onDeleteCategory.bind(this)}
            />
          ))}
          {!deleteMode && (
            <AddCategory onAdd={this.onAddNewCategory.bind(this)} />
          )}
        </Box>
      </Box>
    );
  }

  renderMain() {
    const { categories, videos } = this.state;
    const numVideos = videos.length;
    if (numVideos) {
      return (
        <Box display="flex" flexWrap="wrap">
          {this.state.searchedVideos.map(video => (
            <VideoComponent
              key={video.video_id}
              video={video}
              categories={categories}
              onChangeCategory={this.onChangeCategory.bind(this)}
            /> // TODO: update to actually pull in data
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
          <Box p={1} />
          <Box>Looks like you have no videos yet!</Box>
        </Box>
      </GreyFont>
    );
  }

  render() {
    return (
      <Box>
        {this.props.Navbar()}
        <Container>
          <Box display="flex" flexDirection="row">
            <Box mt={3} mr={4}>
              <h3 style={{ color: RED_COLOR }}>My Videos</h3>
            </Box>
            <Search
              components={this.state.videos}
              updateSearchedComponents={this.updateSearchedVideos.bind(this)}
              searchType="videos"
              categorySearch={this.state.selectedCategories}
            />
          </Box>
          {this.renderCategoryLabels()}
          {this.renderMain()}
        </Container>
      </Box>
    );
  }
}

export default VideoPage;
