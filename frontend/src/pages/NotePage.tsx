import React from "react";
import Box from "@material-ui/core/Box";
import { styled as materialStyled } from "@material-ui/core/styles";
import { DARK_GREY_COLOR, RED_COLOR } from "../colorConstants";
import { getNotes } from "../api/notes";
import { NoteType } from "../types";
import Note from "../components/Note";
import Container from "../components/Container";
import Search from "../components/Search";
import Typography from "@material-ui/core/Typography";

interface Props {
  Navbar: any;
}

interface State {
  notes: Array<NoteType>;
  searchedNotes: Array<NoteType>;
}

const GreyFont = materialStyled(Box)({
  color: DARK_GREY_COLOR
});

class NotePage extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);

    this.state = {
      notes: [],
      searchedNotes: []
    };
  }

  async getNotes(): Promise<void | NoteType[]> {
    const response = await getNotes({ sort: "-last_edited" });

    if (response && response.num_notes) {
      var minLen = Number.MAX_SAFE_INTEGER;

      for (var note of response.notes) {
        if (note.last_edited.toString().length < minLen) {
          minLen = note.last_edited.toString().length;
        }
      }

      const sortedNotes = response.notes.sort((n1, n2) => {
        if (
          Number(n1.last_edited.toString().substring(0, minLen)) <
          Number(n2.last_edited.toString().substring(0, minLen))
        ) {
          return 1;
        }
        if (
          Number(n1.last_edited.toString().substring(0, minLen)) >
          Number(n2.last_edited.toString().substring(0, minLen))
        ) {
          return -1;
        }
        return 0;
      });

      return sortedNotes;
    }

    return undefined;
  }

  async componentDidMount() {
    const notes = await this.getNotes();

    if (notes) {
      this.setState({ notes: notes, searchedNotes: notes });
    }
  }

  renderMain() {
    const { notes, searchedNotes } = this.state;
    const numNotes = notes.length;
    const numSearchedNotes = searchedNotes.length;

    if (numNotes && numSearchedNotes) {
      return (
        <Box mr={4}>
          {searchedNotes.map(n => (
            <Note noteData={n} thumbNail youtubeLink />
          ))}
        </Box>
      );
    } else if (numNotes && !numSearchedNotes) {
      return (
        <Box mt="3" display="flex">
          <Typography variant="h6">No notes found.</Typography>
        </Box>
      );
    } else {
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
            <Box>Looks like you have no notes yet!</Box>
          </Box>
        </GreyFont>
      );
    }
  }

  updateSearchedNotes(searchedNotes: Array<NoteType>) {
    this.setState({ searchedNotes: searchedNotes });
  }

  render() {
    return (
      <Box>
        {this.props.Navbar()}
        <Container>
          <Box display="flex" flexDirection="row">
            <Box mt={3} mr={4}>
              <h3 style={{ color: RED_COLOR }}>My Notes</h3>
            </Box>
            <Search
              components={this.state.notes}
              updateSearchedComponents={this.updateSearchedNotes.bind(this)}
              searchType="notes"
            />
          </Box>
          <Box p="2" />
          {this.renderMain()}
        </Container>
      </Box>
    );
  }
}

export default NotePage;
