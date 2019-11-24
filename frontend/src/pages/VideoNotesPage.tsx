import React from "react";
import Box from "@material-ui/core/Box";
import { styled as materialStyled } from "@material-ui/core/styles";
import Thumbnail from "../components/Thumbnail";
import { getPlural } from "../utils/stringUtils";
import Note from "../components/Note";
import { RED_COLOR, DARK_GREY_COLOR } from "../colorConstants";
import { getVideos } from "../api/videos";
import { getNotes } from "../api/notes";
import { VideoType, NoteType } from "../types";
import { RouteComponentProps } from "react-router-dom";
import Search from "../components/Search";
import Container from "../components/Container";
import YoutubeLink from "../components/YoutubeLink";
import { formatTimestamp } from "../utils/stringUtils";
import Dropdown from "react-bootstrap/Dropdown";
import Typography from "@material-ui/core/Typography";

const FontStyleComponent = materialStyled(Box)({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
});

interface Props extends RouteComponentProps<MatchParams> {
  Navbar: any;
}

interface State {
  video: VideoType | void;
  notes: NoteType[];
  searchedNotes: Array<NoteType>;
}

interface MatchParams {
  video_id: string;
}

const GreyFont = materialStyled(Box)({
  color: DARK_GREY_COLOR
});

class VideoNotesPage extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);
    this.state = {
      video: undefined,
      notes: [],
      searchedNotes: []
    };
  }

  async getVideos(video_id: string) {
    const response = await getVideos({ sort: "-last_edited", video_id });
    if (response && response.num_videos)
      this.setState({ video: response.videos[0] });
  }

  updateSearchedNotes(searchedNotes: Array<NoteType>) {
    this.setState({ searchedNotes: searchedNotes });
  }

  exportNotes(withTimestamps: boolean) {
    const { video, notes } = this.state;
    const notes_text = notes
      .map(n => {
        return withTimestamps
          ? formatTimestamp(n.timestamp) + " " + n.note
          : n.note;
      })
      .join("\n");
    const exported_notes_text = notes.length
      ? (video as VideoType).video_title + "\n" + notes_text
      : "";
    const element = document.createElement("a");
    const file = new Blob([exported_notes_text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = (video as VideoType).video_title + "_exported.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  async getNotes(video_id: string) {
    const response = await getNotes({ video_id: video_id });
    if (response)
      this.setState({ notes: response.notes, searchedNotes: response.notes });
  }

  async componentDidMount() {
    const { video_id } = this.props.match.params;

    await this.getVideos(video_id);
    await this.getNotes(video_id);
  }

  renderVideoNotes() {
    const { notes, searchedNotes } = this.state;
    const numNotes = notes.length;
    const numSearchedNotes = searchedNotes.length;

    if (numNotes && numSearchedNotes) {
      return (
        <Box display="flex" flexDirection="column" flexGrow={1}>
          {searchedNotes.map(n => (
            <Note noteData={n} thumbNail={false} youtubeLink />
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
            <Box>Looks like you have no notes for this video yet!</Box>
          </Box>
        </GreyFont>
      );
    }
  }

  render() {
    const { video, notes, searchedNotes } = this.state;

    if (!video) {
      return (
        <FontStyleComponent
          p={3}
          display="flex"
          flexDirection="column"
          flexGrow={1}
        >
          <Box p={1} />
          <Box display="flex" flexGrow={1}>
            Looks like you have no notes for this video yet!
          </Box>
        </FontStyleComponent>
      );
    }

    return (
      <Box>
        {this.props.Navbar()}
        <Container>
          <Box mt={3} display="flex" flexDirection="row">
            <h3 style={{ color: RED_COLOR }}>Notes for: </h3>
            <Box mr={1} />
            <h3>{video.video_title}</h3>
          </Box>
          <Box mt={3} display="flex" flexDirection="row">
            <Search
              components={this.state.notes}
              updateSearchedComponents={this.updateSearchedNotes.bind(this)}
              searchType="notes"
            />
            <Box ml={3} mt={4}>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Export notes as text
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => this.exportNotes(true)}>
                    With timestamps
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => this.exportNotes(false)}>
                    Without timestamps
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Box>
          </Box>
          <Box display="flex" flexGrow={1}>
            <Box mr={3} alignItems="center" style={{ width: 200 }}>
              <Thumbnail height={130} width={200} video_id={video.video_id} />
              <Box>
                <YoutubeLink videoId={video.video_id} timestamp={0}>
                  <b>{video.video_title}</b>
                </YoutubeLink>
              </Box>
              <Box>
                {notes.length} {getPlural("note", notes.length)}
              </Box>
            </Box>

            {this.renderVideoNotes()}
          </Box>
        </Container>
      </Box>
    );
  }
}

export default VideoNotesPage;
