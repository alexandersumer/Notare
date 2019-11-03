import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const Youtube = (function () {
    let video, results;

    const getThumb = function (url: string, size: string) {
        if (url === null) {
            return '';
        }

        size    = (size === null) ? 'big' : size;
        results = url.match('[\\?&]v=([^&#]*)');
        video   = (results === null) ? url : results[1];

        if (size === 'small') {
            return 'http://img.youtube.com/vi/' + video + '/2.jpg';
        }
        
        return 'http://img.youtube.com/vi/' + video + '/0.jpg';
    };

    return {
        thumb: getThumb
    };
}());

const thumbnail = Youtube.thumb('http://www.youtube.com/watch?v=F4rBAf1wbq4', 'big');

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
        <img 
        src={thumbnail}
        alt="new"
        />
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
      </Container>
    </React.Fragment>
  );
}