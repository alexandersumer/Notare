import React from "react";
import Box from "@material-ui/core/Box";
import Thumbnail from "./Thumbnail";
import { NoteType } from "../types";
import { styled as materialStyled } from "@material-ui/core/styles";
import { LIGHT_PINK_COLOR } from "../colorConstants";
import { Link as RouterLink } from "react-router-dom";
import YoutubeLink from "./YoutubeLink";
import { formatTimestamp } from "../utils/stringUtils";

const NoteStyle = materialStyled(Box)({
  height: "80px",
  backgroundColor: LIGHT_PINK_COLOR,
  borderRadius: "5px"
});

interface Props {
  noteData: NoteType;
  thumbNail: boolean;
  youtubeLink: boolean;
}

const Note = (props: Props) => {
  const { noteData, thumbNail, youtubeLink } = props;

  return (
    <Box display="flex" flexDirection="row" mb={2} flexGrow={1}>
      {thumbNail && (
        <RouterLink to={`/VideoNotes/${noteData.video_id}`}>
          <Thumbnail video_id={noteData.video_id}></Thumbnail>
        </RouterLink>
      )}
      <NoteStyle ml display="flex" flexDirection="row" flexGrow={1}>
        <Box p={1} mr={1} display="flex" alignItems="center">
          <YoutubeLink
            videoId={noteData.video_id}
            timestamp={noteData.timestamp}
          >
            {formatTimestamp(noteData.timestamp)}
          </YoutubeLink>
        </Box>
        <Box p={1} display="flex" alignItems="center" flexGrow={1}>
          {noteData.note}
        </Box>
      </NoteStyle>
    </Box>
  );
};

export default Note;
