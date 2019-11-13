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
}

interface State {
  searchBarText: string;
  myComponents: Array<NoteType> | Array<VideoType> | Array<string>;
}

function fuzzy_match(str: string, pattern: string): boolean {
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

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevProps.components !== this.props.components) {
      this.setState({ myComponents: this.props.components });
    }
  }

  onChange(event: any) {
    // TODO: Add type
    this.props.updateSearchedComponents(this.getResults(event.target.value));
  }

  // Text box input
  // On submit, go fetch matchesw`1   qsrcfgb n
  // Pull all notes from API
  // Filter matches based on textbox content

  getResults(searchBarText: string) {
    const { myComponents } = this.state;
    // filter for notes, videos that have searchbartext in them
    if (searchBarText === "") return myComponents;
    if (this.props.searchType === "notes") {
      return (myComponents as Array<NoteType>).filter(c =>
        fuzzy_match(c.note.toLowerCase(), searchBarText.toLowerCase())
      );
    } else if (this.props.searchType === "videos") {
      return (myComponents as Array<VideoType>).filter(c =>
        fuzzy_match(c.video_title.toLowerCase(), searchBarText.toLowerCase())
      );
    } else if (this.props.searchType === "categories") {
      return (myComponents as Array<string>).filter(c =>
        fuzzy_match(c.toLowerCase(), searchBarText.toLowerCase())
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
          label={"Search by " + this.props.searchType}
          onChange={this.onChange.bind(this)}
        />
      </Box>
    );
  }
}
