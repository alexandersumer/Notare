import * as React from "react";
import { NoteType } from "../types";
import { VideoType } from "../types";
import Box from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";

interface Props {
  components: Array<NoteType> | Array<VideoType> | Array<string>;
  updateSearchedComponents: Function;
  searchType: string;
  categorySearch?: Array<string>;
}

interface State {
  searchBarText: string;
  myComponents: Array<NoteType> | Array<VideoType> | Array<string>;
}

function fuzzy_match(str: string, pattern: string): boolean {
  if (pattern == "") return true;
  pattern = pattern.split("").reduce(function(a, b) {
    return a + ".*" + b;
  });
  return new RegExp(pattern).test(str);
}

export default class Search extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);
    this.state = {
      searchBarText: "",
      myComponents: props.components
    };
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.components !== this.props.components) {
      this.setState({ myComponents: this.props.components });
    }
    const searchBarTextUpdated = prevState.searchBarText !== this.state.searchBarText;
    const oldCat = prevProps.categorySearch;
    const newCat = this.props.categorySearch;
    if (searchBarTextUpdated || oldCat != null && newCat != null && oldCat.length !== newCat.length){
      this.props.updateSearchedComponents(this.getResults());
    }
  }

  categoryMatch(video: VideoType) : boolean {
    const { categorySearch } = this.props;
    if (categorySearch == null || categorySearch.length === 0) return true;
    const result = categorySearch.includes(video.categories)
    return result;
  }

  onChange(event: any) {
    this.setState({
      searchBarText: event.target.value,
    })
    this.props.updateSearchedComponents(this.getResults());
  }

  // Text box input
  // On submit, go fetch matchesw`1   qsrcfgb n
  // Pull all notes from API
  // Filter matches based on textbox content

  getResults() {
    const { myComponents, searchBarText } = this.state;
    // filter for notes, videos that have searchbartext in them
    if (this.props.searchType === "notes") {
      return (myComponents as Array<NoteType>).filter(c =>
        fuzzy_match(c.note.toLowerCase(), searchBarText.toLowerCase())
      );
    } else if (this.props.searchType === "videos") {
      return (myComponents as Array<VideoType>).filter(c =>
        fuzzy_match(c.video_title.toLowerCase(), searchBarText.toLowerCase())
        && this.categoryMatch(c) // search based on categories too
      );
    }
    return null;
  }

  render() {
    return (
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box mr={2}>
          <SearchIcon />
        </Box>
        <TextField
          style={{ width: "600px" }}
          type="search"
          margin="normal"
          value={this.state.searchBarText}
          label={"Search by " + this.props.searchType}
          onChange={this.onChange.bind(this)}
        />
      </Box>
    );
  }
}
