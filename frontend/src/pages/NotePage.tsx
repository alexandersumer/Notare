import React from "react";
import Box from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
import GetAppIcon from "@material-ui/icons/GetApp";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { styled as materialStyled } from "@material-ui/core/styles";
import { GREY_COLOR, RED_COLOR, PINK_COLOR } from "../colorConstants";
import { getNotes } from "../api/notes";
import { NoteType } from "../types";
import Note from "../components/Note";

const USER_ID = 1;

const FontStyleComponent = materialStyled(Box)({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
});

interface Props {}

interface State {
  notes: Array<NoteType>;
}

const TestNoteComp = materialStyled(Box)({
  width: "400px",
  height: "100px",
  backgroundColor: PINK_COLOR
});

const GreyFont = materialStyled(Box)({
  color: GREY_COLOR
});

class NotePage extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);

    this.state = {
      notes: []
    };
  }

  async componentDidMount() {
    const notes = await this.getNotes();
    if (notes) {
      this.setState({ notes });
    }
  }

  renderMain() {
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
          <Box>Looks like you have no notes yet!</Box>
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

  async getNotes(): Promise<void | NoteType[]> {
    const response = await getNotes({
      sort: "-timestamp",
      user_id: USER_ID
    });
    if (response) return response.notes;
    return undefined;
  }

  render() {
    return (
      <FontStyleComponent p={3}>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Box mr={2}>
            <SearchIcon />
          </Box>
          <TextField
            style={{ width: "600px" }}
            type="search"
            margin="normal"
            label="Search by note text and video name..."
          />
        </Box>
        <Box mr={4}>{this.state.notes.map(n => (<Note noteData={n}/>))}</Box>
        <Box>
          <h3 style={{ color: RED_COLOR }}>Recent Notes</h3>
          {this.renderMain()}
        </Box>
      </FontStyleComponent>
    );
  }
}

export default NotePage;
