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
import { RouteComponentProps } from "react-router-dom"

const USER_ID = 1;

const FontStyleComponent = materialStyled(Box)({
  fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
});

interface MatchParams {
  video_id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

interface State {
  video: VideoType | void,
  notes: NoteType[],
}

class VideoNotesPage extends React.Component<Props, State> {
    constructor(props:Props, state: State){
      super(props, state);
      this.state = {
        video: undefined,
        notes: [],
      }
    }
    
    async getVideos(video_id: string) {
      const response = await getVideos({ user_id: USER_ID, video_id }); 
      if (response && response.num_videos) this.setState({ video: response.videos[0] });
    }

    async getNotes(video_id: string) {
      const response = await getNotes({ user_id: USER_ID, video_id: video_id });
      if (response) this.setState({ notes: response.notes });
    }

     async componentDidMount() {
      const { video_id } = this.props.match.params;

      await this.getVideos(video_id);
      await this.getNotes(video_id);
    }

    render(){
      const { video, notes } = this.state;

      return (
        <FontStyleComponent p={3} display="flex" flexDirection="column" flexGrow={1}>
          <h3 style={{ color: RED_COLOR }}>Recent Notes</h3>
          <Box display="flex" flexGrow={1}>
            <Box mr={3}>
              <Thumbnail video_id={video ? video.video_id : ""}/>
              <Box><b>{video ? video.video_title : "No video loaded!"}</b></Box>
              <Box>{notes.length} {getPlural("note", notes.length)}</Box>
            </Box>

            <Box display="flex" flexDirection="column" flexGrow={1}>
              {notes.map(n => (<Note noteData={n} thumbNail={false}/>))}
            </Box>
          </Box>
        </FontStyleComponent>
      )
    }
}
export default VideoNotesPage;