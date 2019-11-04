import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { getThumbnail } from '../utils/YoutubeUtils';

function getNoteText(noteId: string) {
    return;
}

function getTimeStamp(noteId: string) {
    return;
}

export const Note = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <img src={getThumbnail('http://www.youtube.com/watch?v=F4rBAf1wbq4')} alt="new"/>
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
      </Container>
    </React.Fragment>
  );
}