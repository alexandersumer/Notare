import React from "react";
import Box from "@material-ui/core/Box";
import Thumbnail from "./Thumbnail";
import { NoteType } from "../types";
import { styled as materialStyled } from "@material-ui/core/styles";
import { PINK_COLOR } from "../colorConstants";
import { Link as RouterLink } from "react-router-dom";
import YoutubeLink from "./YoutubeLink";

const formatTimestamp = (seconds: number): string => {
  let date = new Date(0);
  date.setSeconds(seconds);
  if (seconds >= 60*60) return date.toISOString().substr(11, 8);
  return date.toISOString().substr(14, 5);
};

const NoteStyle = materialStyled(Box)({
  height: "80px",
  backgroundColor: PINK_COLOR,
  borderRadius: "5px"
});

interface Props {
  noteData: NoteType;
  thumbNail: boolean;
  youtubeLink: boolean;
}

const Note = (props: Props) => {
  const { noteData, thumbNail, youtubeLink } = props;

  const renderNotesLink = () => (
    <Box
      m={2}
      display="flex"
      alignItems="center"
      style={{ whiteSpace: "nowrap" }}
    >
      <YoutubeLink videoId={noteData.video_id} timestamp={noteData.timestamp}>
        [Go to Video]
      </YoutubeLink>
    </Box>
  );

  return (
    <Box display="flex" flexDirection="row" mb={2} flexGrow={1}>
      {thumbNail && (
        <RouterLink to={`/VideoNotes/${noteData.video_id}`}>
          <Thumbnail video_id={noteData.video_id}></Thumbnail>
        </RouterLink>
      )}
      <NoteStyle ml display="flex" flexDirection="row" flexGrow={1}>
        <Box p={1} mr={1} display="flex" alignItems="center">
          <YoutubeLink videoId={noteData.video_id} timestamp={noteData.timestamp}>{formatTimestamp(noteData.timestamp)}</YoutubeLink>
        </Box>
        <Box p={1} display="flex" alignItems="center" flexGrow={1}>
          {noteData.note}
        </Box>
        {youtubeLink && renderNotesLink()}
      </NoteStyle>
    </Box>
  );
};

export default Note;
