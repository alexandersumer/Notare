import React from "react";
import Box from "@material-ui/core/Box";
import GetAppIcon from "@material-ui/icons/GetApp";
import Button from "@material-ui/core/Button";
import { styled as materialStyled } from "@material-ui/core/styles";
import { GREY_COLOR, RED_COLOR, PINK_COLOR } from "../colorConstants";
import { getCategories, addCategory } from "../api/categories";
import Navbar from "../components/Navbar";
import Folder from "../components/Folder";
import Search from "../components/Search";

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
  newCategoryText: string;
}

class CollectionPage extends React.Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      categories: [],
      searched_categories: [],
      newCategoryText: ""
    };
  }

  getCategories = async () => {
    const response = await getCategories();
    response &&
      this.setState({
        categories: response.tags,
        searched_categories: response.tags,
      });
  };

  updateSearchedCategories(searched_categories: Array<string>) {
    this.setState({ searched_categories: searched_categories });
  }

  componentDidMount() {
    this.getCategories();
  }

  postCategory = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (this.state.newCategoryText === "") return;
    const response = await addCategory({ tag: this.state.newCategoryText });
    await this.getCategories();
  }

  handleCategoryChange = (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.setState({ newCategoryText: (event.target as HTMLInputElement).value });
  };

  createNewCategory() {
    return (
        <Box>
          Add New Collection:
          <form onSubmit={this.postCategory}>
                <input
                  type="text"
                  name="category"
                  placeholder={this.state.newCategoryText}
                  onChange={this.handleCategoryChange}
                />
          </form>
        </Box>
    );
  }

  renderMain() {
    const numCategories = this.state.categories.length;
    if (numCategories) {
      return (
        <Box display="flex" flexWrap="wrap">
          {this.state.searched_categories.map(category => (
            <Folder key={category} category={category} />
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
    const email = localStorage.getItem("email") || "";
    const username = email.substring(0, email.indexOf("@"));
    return (
      <FontStyleComponent p={3}>
        <Navbar username={username}/>
        <Search
          components={this.state.categories}
          updateSearchedComponents={this.updateSearchedCategories.bind(this)}
          searchType="categories"
        />
        {this.createNewCategory()}
        <Box>
          <h3 style={{ color: RED_COLOR }}>Categories</h3>
          {this.renderMain()}
        </Box>
      </FontStyleComponent>
    );
  }
}

export default CollectionPage;
