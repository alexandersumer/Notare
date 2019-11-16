import React from "react";
import Box from "@material-ui/core/Box";
import { styled as materialStyled } from "@material-ui/core/styles";
import Thumbnail from "../components/Thumbnail";
import { getPlural } from "../utils/stringUtils";
import Note from "../components/Note";
import { RED_COLOR, GREY_COLOR } from "../colorConstants";
import { getVideos } from "../api/videos";
import { getNotes } from "../api/notes";
import { VideoType, NoteType } from "../types";
import { RouteComponentProps } from "react-router-dom";
import Search from "../components/Search";
import Navbar from "../components/Navbar";

const FontStyleComponent = materialStyled(Box)({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
});

interface MatchParams {
  video_id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

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
    const accessToken = localStorage.getItem("accessToken");
    const userId: number = parseInt(localStorage.getItem("userId") as string);
    const response = await getVideos(
      { sort: "-last_edited", user_id: userId, video_id },
      accessToken as string
    );
    if (response && response.num_videos)
      this.setState({ video: response.videos[0] });
  }

  updateSearchedNotes(searched_notes: Array<NoteType>) {
    this.setState({ searched_notes: searched_notes });
  }

  async getNotes(video_id: string) {
    const accessToken = localStorage.getItem("accessToken");
    const userId: number = parseInt(localStorage.getItem("userId") as string);
    const response = await getNotes(
      { user_id: userId, video_id: video_id },
      accessToken as string
    );
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
      <FontStyleComponent
        p={3}
        display="flex"
        flexDirection="column"
        flexGrow={1}
      >
        <Navbar />
        <Search
          components={this.state.notes}
          updateSearchedComponents={this.updateSearchedNotes.bind(this)}
          searchType="notes"
        />
        <Box display="flex" flexDirection="row">
          <h3 style={{ color: RED_COLOR }}>My Notes for: </h3>
          <Box mr={1} />
          <h3>{video.video_title}</h3>
        </Box>
        <Box display="flex" flexGrow={1}>
          <Box mr={3}>
            <Thumbnail video_id={video.video_id} />
            <Box>
              <b>{video.video_title}</b>
            </Box>
            <Box>
              {notes.length} {getPlural("note", notes.length)}
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" flexGrow={1}>
            {searched_notes.map(n => (
              <Note noteData={n} thumbNail={false} allNotesLink={false} />
            ))}
          </Box>
        </Box>
      </FontStyleComponent>
    );
  }
}

export default VideoNotesPage;
