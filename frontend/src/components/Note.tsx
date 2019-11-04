import React from "react";
import Box from "@material-ui/core/Box";
import Thumbnail from "./Thumbnail";
import { NoteType } from "../types";
import { styled as materialStyled } from "@material-ui/core/styles";
import { PINK_COLOR } from "../colorConstants";
import Link from '@material-ui/core/Link';

const formatTimestamp = (seconds: number): string => {
  let date = new Date(0);
  date.setSeconds(seconds);
  if (seconds >= 60) return date.toISOString().substr(11, 8);
  return date.toISOString().substr(14, 5);
};

const getYoutubeTimeLink = (video_id: string, timestamp: number) : string =>
  (`https://youtu.be/${video_id}?t=${Math.floor(timestamp)}`)

const NoteStyle = materialStyled(Box)({
  height: "80px",
  backgroundColor: PINK_COLOR,
  borderRadius: "5px"
});

interface Props {
  noteData: NoteType;
}

const Note = (props: Props) => {
  const { noteData } = props;
  const YoutubeLink = (props: any) => (
    <Link href={getYoutubeTimeLink(noteData.video_id, noteData.timestamp)}>{props.children}</Link>
  );

  return (
    <Box display="flex" flexDirection="row" m={3} flexGrow={1}>
    <YoutubeLink><Thumbnail video_id={noteData.video_id}></Thumbnail></YoutubeLink>
      <NoteStyle ml display="flex" flexDirection="row" flexGrow={1}>
        <Box p={1} mr={1} display="flex" alignItems="center">
          <YoutubeLink>{formatTimestamp(noteData.timestamp)}</YoutubeLink>
        </Box>
        <Box p={1} display="flex" alignItems="center">
          {noteData.note}
        </Box>
      </NoteStyle>
    </Box>
  );
};

export default Note;
