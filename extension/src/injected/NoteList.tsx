import * as React from "react";
import styled from "styled-components";
import { TEXT_COLOR, NOTE_COLOR } from "../colorConstants";
import { Note } from "./types";
import Box from "@material-ui/core/Box";
import { editNotesParams } from "../api/notes";

import NoteItem from "./NoteItem";

const StyledWrapper = styled.div`
  color: ${TEXT_COLOR};
  overflow: auto;
  height: 230px;
  font-size: 13px;
`;

interface Props {
  notesList: Note[];
  onChangeVideoTime: (timestamp: number) => void;
  onDeleteNote: (note_id: number) => void;
  onEditNote: (note_params: editNotesParams) => Promise<void>;
}

export default class NoteList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { notesList, onDeleteNote, onEditNote } = this.props;
    const displayList = notesList.reverse()
    return (
      <StyledWrapper>
        <Box display="flex" flexDirection="column">
          {displayList.length
            ? displayList.map(n => (
                <NoteItem
                  key={n.note_id}
                  note={n}
                  onDeleteNote={onDeleteNote}
                  onEditNote={onEditNote}
                  onChangeVideoTime={this.props.onChangeVideoTime}
                />
              ))
            : "There are no notes for this video"}
        </Box>
      </StyledWrapper>
    );
  }
}
