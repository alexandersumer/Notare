import * as React from 'react';
import styled from 'styled-components';
import { TEXT_COLOR } from '../colorConstants';
import { Note } from './types';

const StyledWrapper = styled.div`
    color: ${TEXT_COLOR};
`;

export default class NoteList extends React.Component<{notesList: Note[]}> {
  constructor(props){
      super(props);
  }

  render(){
      const { notesList } = this.props
      return(
          <StyledWrapper>
              {notesList.length ? notesList.map(n => (
                <div key={n.note_id}>{n.timestamp} - {n.note}</div>
              )): "There are no notes for this video" }
          </StyledWrapper>
      );
  }
}