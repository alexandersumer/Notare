import * as React from 'react';
import styled from 'styled-components';
import { TEXT_COLOR, NOTE_COLOR } from '../colorConstants';
import { Note } from './types';

const StyledWrapper = styled.div`
    color: ${TEXT_COLOR};
    background-color: ${NOTE_COLOR};
    overflow: auto;
    height: 230px;
    padding: 3px;
    font-size: 12px;
`;

const NoteWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const formatTimestamp = (seconds: number): string => {
    const date = new Date(null);
    date.setSeconds(seconds);
    const timeString = date.toISOString().substr(11, 8);
    return timeString;
}

class NoteComponent extends React.Component<{note: Note}, {hover: boolean}> {
    constructor(props){
        super(props);
        this.state = {
            hover: false,
        }
    }

    onMouseEnter (e) {
        this.setState({hover: true});
    }
    onMouseLeave (e) {
        this.setState({hover : false});
    }

    render(){
        const note = this.props.note;
        return (
            <NoteWrapper
                key={note.note_id} 
                onMouseEnter={this.onMouseEnter.bind(this)}
                onMouseLeave={this.onMouseLeave.bind(this)}>
                {this.state.hover
                    ? "Edit Note"
                    : formatTimestamp(note.timestamp)}
                - {note.note}
            </NoteWrapper> 
        );

    }
}

export default class NoteList extends React.Component<{notesList: Note[]}> {
  constructor(props){
      super(props);
  }

  render(){
      const { notesList } = this.props
      return(
          <StyledWrapper>
                { notesList.length 
                    ? notesList.map(n => (<NoteComponent note={n}/>))
                    : "There are no notes for this video"
                }
          </StyledWrapper>
      );
  }
}