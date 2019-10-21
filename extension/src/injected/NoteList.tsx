import * as React from 'react';
import styled from 'styled-components';
import { TEXT_COLOR } from '../colorConstants';
import { Note } from './types';
import NoteItem from './NoteItem';

const StyledWrapper = styled.div`
    color: ${TEXT_COLOR};
    overflow: auto;
    height: 230px;
    font-size: 13px;
`;

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
                <NoteItem note={n} onDeleteNote={onDeleteNote}/>
              )): "There are no notes for this video" }
          </StyledWrapper>
      );
  }
}