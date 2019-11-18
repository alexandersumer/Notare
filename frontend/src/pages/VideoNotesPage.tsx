import React from "react";
import Box from "@material-ui/core/Box";
import { styled as materialStyled } from "@material-ui/core/styles";
import Thumbnail from "../components/Thumbnail";
import { getPlural } from "../utils/stringUtils";
import Note from "../components/Note";
import { RED_COLOR } from "../colorConstants";
import { getVideos } from "../api/videos";
import { getNotes } from "../api/notes";
import { VideoType, NoteType } from "../types";
import { RouteComponentProps } from "react-router-dom";
import Search from "../components/Search";
import Container from "../components/Container";
import YoutubeLink from "../components/YoutubeLink";

const FontStyleComponent = materialStyled(Box)({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
});

interface MatchParams {
  video_id: string;
}

interface Props extends RouteComponentProps<MatchParams> {
  Navbar: any;
}

interface State {
  video: VideoType | void;
  notes: NoteType[];
  searched_notes: Array<NoteType>;
}

class VideoNotesPage extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);
    this.state = {
      video: undefined,
      notes: [],
      searched_notes: []
    };
  }

  async getVideos(video_id: string) {
    const response = await getVideos({ sort: "-last_edited", video_id });
    if (response && response.num_videos)
      this.setState({ video: response.videos[0] });
  }

  updateSearchedNotes(searched_notes: Array<NoteType>) {
    this.setState({ searched_notes: searched_notes });
  }

  async getNotes(video_id: string) {
    const response = await getNotes({ video_id: video_id });
    if (response)
      this.setState({ notes: response.notes, searched_notes: response.notes });
  }

  async componentDidMount() {
    const { video_id } = this.props.match.params;

    await this.getVideos(video_id);
    await this.getNotes(video_id);
  }

  render() {
    const { video, notes, searched_notes } = this.state;

    if (!video) {
      return (
        <FontStyleComponent
          p={3}
          display="flex"
          flexDirection="column"
          flexGrow={1}
        >
          <Box display="flex" flexGrow={1}>
            No notes for this video :(
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
          <Search
            components={this.state.notes}
            updateSearchedComponents={this.updateSearchedNotes.bind(this)}
            searchType="notes"
          />
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

            <Box display="flex" flexDirection="column" flexGrow={1}>
              {searched_notes.map(n => (
                <Note noteData={n} thumbNail={false} youtubeLink />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default VideoNotesPage;
