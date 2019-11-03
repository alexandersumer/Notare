import React from "react";

const Youtube = (function () {
    let video, results;

    const getThumb = function (url, size) {
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

export const Note = () => <h1>Note</h1>;
