import * as React from 'react';
import styled from 'styled-components';
import { TEXT_COLOR } from '../colorConstants';
import { Note } from './types';

const StyledWrapper = styled.div`
    color: ${TEXT_COLOR};
`;

const formatTimestamp = (seconds: number): string => {
    const date = new Date(null);
    date.setSeconds(seconds);
    const timeString = date.toISOString().substr(11, 8);
    return timeString;
}

type Props = {
    notesList: Note[],
    onDeleteNote: (number) => void,
};

export default class NoteList extends React.Component<Props> {
  constructor(props){
      super(props);
  }

  render(){
      const { notesList, onDeleteNote } = this.props
      return(
          <StyledWrapper>
              {notesList.length ? notesList.map(n => (
                <div key={n.note_id} onClick={() => onDeleteNote(n.note_id)}>{formatTimestamp(n.timestamp)} - {n.note}</div>
              )): "There are no notes for this video" }
          </StyledWrapper>
      );
  }
}