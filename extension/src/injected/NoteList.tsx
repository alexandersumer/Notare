import * as React from 'react';
import styled from 'styled-components';
import { TEXT_COLOR } from '../colorConstants';
import { Note } from './types';

const StyledWrapper = styled.div`
    color: ${TEXT_COLOR};
    overflow: auto;
    height: 230px;
    font-size: 13px;
`;

const formatTimestamp = (seconds: number): string => {
    const date = new Date(null);
    date.setSeconds(seconds);
    const timeString = date.toISOString().substr(11, 8);
    return timeString;
}

export default class NoteList extends React.Component<{notesList: Note[]}> {
  constructor(props){
      super(props);
  }

  render(){
      const { notesList } = this.props
      return(
          <StyledWrapper>
              {notesList.length ? notesList.map(n => (
                <div key={n.note_id}>{formatTimestamp(n.timestamp)} - {n.note}</div>
              )): "There are no notes for this video" }
          </StyledWrapper>
      );
  }
}