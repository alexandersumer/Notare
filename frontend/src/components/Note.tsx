import React from "react";
import Box from '@material-ui/core/Box';
import Thumbnail from './Thumbnail';
import { NoteType } from '../types';
import { styled as materialStyled } from '@material-ui/core/styles';
import { PINK_COLOR } from '../colorConstants';

const formatTimestamp = (seconds: number): string => {
  let date = new Date(0);
  date.setSeconds(seconds);
  if (seconds >= 60) return date.toISOString().substr(11, 8);
  return date.toISOString().substr(14, 5);
}

const NoteStyle = materialStyled(Box)({
  height: '80px',
  backgroundColor: PINK_COLOR,
  borderRadius: '5px',
});

interface Props { 
  noteData: NoteType,
}


const Note = (props: Props) => {
  const { noteData }  = props;
  return (
    <Box display="flex" flexDirection="row" m={3} flexGrow={1}>
      <Thumbnail video_id={noteData.video_id}></Thumbnail>
      <NoteStyle ml display="flex" flexDirection="row" flexGrow={1}>
          <Box p={1} mr={1} display="flex" alignItems="center">
            <Box>{formatTimestamp(noteData.timestamp)}</Box>
          </Box>
          <Box p={1} display="flex" alignItems="center">{noteData.note}</Box>
      </NoteStyle>
    </Box>
  );
}

export default Note;