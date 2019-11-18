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
import Container from "../components/Container";

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
            <Note noteData={n} thumbNail youtubeLink />
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
        </Box>
      </GreyFont>
    );
  }

  async getNotes(): Promise<void | NoteType[]> {
    const response = await getNotes({ sort: "-last_edited" });
    if (response) return response.notes;
    return undefined;
  }

  updateSearchedNotes(searched_notes: Array<NoteType>) {
    this.setState({ searched_notes: searched_notes });
  }

  render() {
    const email = localStorage.getItem("email") || "";
    
    return (
      <Box>
        <Navbar email={email}/>
        <Container>
        <Box display="flex" flexDirection="row">
          <Box mt={3} mr={4}><h3 style={{ color: RED_COLOR }}>My Notes</h3></Box>
          <Search
            components={this.state.notes}
            updateSearchedComponents={this.updateSearchedNotes.bind(this)}
            searchType="notes"
          />
        </Box>
        <Box>
          {this.renderMain()}
        </Box>
        </Container>
      </Box>
    );
  }
}

export default NotePage;
