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
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import { access } from "fs";
import Folder from "../components/Folder";


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
  searched_categories: Array<string>;
}

class CollectionPage extends React.Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      categories: [],
      searched_categories: []
    };
  }

  getCategories = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const userId: number = parseInt(localStorage.getItem("userId") as string);
    const response = await getCategories(
      { user_id: userId },
      accessToken as string
    );
    if (response) {
      const categories = response.tags.map((tag: any) => {
        return tag.tag;
      })
      this.setState({
        categories: categories,
        searched_categories: categories
      })
    }
  };

  updateSearchedCategories(searched_categories: Array<string>) {
    this.setState({ searched_categories: searched_categories });
  }

  componentDidMount() {
    this.getCategories();
  }

  renderMain() {
    const numCategories = this.state.categories.length;
    if (numCategories) {
      return (
        <Box display="flex" flexWrap="wrap">
          {this.state.searched_categories.map(category => (
            <Folder category={category}/>
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
          updateSearchedComponents={this.updateSearchedCategories.bind(this)}
          searchType="tags"
        />
        <Box>
          <h3 style={{ color: RED_COLOR }}>Categories</h3>
          {this.renderMain()}
        </Box>
      </FontStyleComponent>
    );
  }
}

export default CollectionPage;
