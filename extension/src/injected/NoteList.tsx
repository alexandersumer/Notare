import * as React from 'react';
import styled from 'styled-components';
import { TEXT_COLOR } from '../colorConstants';

const StyledWrapper = styled.div`
    color: ${TEXT_COLOR};
`;

export default class NoteList extends React.Component<{notesList: string[]}> {
  constructor(props){
      super(props);
  }

  render(){
      const { notesList } = this.props
      return(
          <StyledWrapper>
              {notesList.length ? notesList.map(note => (
                <div key={note}>{note}</div>
              )): "There are no notes for this video" }
          </StyledWrapper>
      );
  }
}