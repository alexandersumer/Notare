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
import Search from "../components/Search";
import Navbar from "../components/Navbar";


const FontStyleComponent = materialStyled(Box)({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
});

interface Props {}

interface State {
  notes: Array<NoteType>;
  searched_notes: Array<NoteType>;
}

const GreyFont = materialStyled(Box)({
  color: GREY_COLOR
});

class NotePage extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);

    this.state = {
      notes: [],
      searched_notes: []
    };
  }

  async componentDidMount() {
    const notes = await this.getNotes();
    if (notes) {
      this.setState({ notes: notes, searched_notes: notes });
    }
  }

  renderMain() {
    const TryNotareBox = materialStyled(Box)({
      width: "300px",
      height: "60px",
      backgroundColor: RED_COLOR,
      color: "white"
    });

    if (this.state.notes.length)
      return (
        <Box mr={4}>
          {this.state.searched_notes.map(n => (
            <Note noteData={n} thumbNail allNotesLink />
          ))}
        </Box>
      );
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
    const accessToken = localStorage.getItem("accessToken");
    const userId: number = parseInt(localStorage.getItem("userId") as string);
    const response = await getNotes({
      sort: "-last_edited",
      user_id: userId
    }, accessToken as string);
    if (response) return response.notes;
    return undefined;
  }

  updateSearchedNotes(searched_notes: Array<NoteType>) {
    this.setState({ searched_notes: searched_notes });
  }

  render() {
    return (
      <FontStyleComponent p={3}>
        <Navbar />
        <Search
          components={this.state.notes}
          updateSearchedComponents={this.updateSearchedNotes.bind(this)}
          searchType="notes"
        />
        <Box>
          <h3 style={{ color: RED_COLOR }}>Recent Notes</h3>
          {this.renderMain()}
        </Box>
      </FontStyleComponent>
    );
  }
}

export default NotePage;
