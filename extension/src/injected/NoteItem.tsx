import * as React from 'react';
import { Note } from './types';
import styled from 'styled-components';

const formatTimestamp = (seconds: number): string => {
    const date = new Date(null);
    date.setSeconds(seconds);
    const timeString = date.toISOString().substr(11, 8);
    return timeString;
}

type Props = {
    note: Note,
    onDeleteNote: (number) => void,
}

export default class NoteItem extends React.Component<Props> {
   render(){
	   const { timestamp, note, note_id} = this.props.note;
	   const { onDeleteNote } = this.props;
	   
	   return (
		<div onClick={() => onDeleteNote(note_id)}>{formatTimestamp(timestamp)} - {note}</div>
	   );
   }
}