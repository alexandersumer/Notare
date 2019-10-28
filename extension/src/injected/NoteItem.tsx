import * as React from 'react';
import { Note } from './types';
import styled from 'styled-components';
import {NOTE_COLOR, TEXT_COLOR } from '../colorConstants';
import { MAX_CHARS } from '../constants';
import { styled as materialStyled } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

import { Box, Paper, IconButton, Link } from '@material-ui/core';

const formatTimestamp = (seconds: number): string => {
    const date = new Date(null);
    date.setSeconds(seconds);
    const timeString = date.toISOString().substr(11, 8);
    return timeString;
}

const StyledTextArea = styled.textarea`
    font-size: 12px;
    margin-bottom: 20px;
    color: ${TEXT_COLOR};
    width: 100%;
    height: 100%;
    background-color: white;
    border: none;
    resize: none;
    /* handles border radius */
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    /* handles overflow due to 100%*/
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
`;

const MyPaper = materialStyled(Paper)({
  background: NOTE_COLOR,
  fontSize: 12,
  border: 0,
  borderRadius: 3,
  color: TEXT_COLOR,
	width: '100%',
});

const MyIconButton = materialStyled(IconButton)({
    padding: 2,
});

type Props = {
    note: Note,
    onDeleteNote: (number) => void,
}

type State = {
	inEditMode: boolean,
}

export default class NoteItem extends React.Component<Props, State> {
	constructor(props){
		super(props);
		this.state = {
			inEditMode: false,
		};
	}

	handleDoubleClick(){
		this.setState({inEditMode: true});
	}

	renderMainBox(){
		const { note } = this.props.note;
        if (this.state.inEditMode){
            return (
                <Box display="flex" flexGrow={1}>
                    <StyledTextArea maxLength={MAX_CHARS} defaultValue={note}/>
                </Box>
            );
        }
        const MyTextDisplayBox = materialStyled(Box)({
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            minWidth: 0,
        });
        return (
            <MyTextDisplayBox display="flex" flexGrow={1} onDoubleClick={this.handleDoubleClick.bind(this)}>
                {note}
            </MyTextDisplayBox>
		);
    }

    renderSideBar(){
        if (this.state.inEditMode){
            return (
                <Box display="flex" flexDirection="column" >
                    <MyIconButton aria-label="delete" onClick={this.deleteNote.bind(this)}><DeleteIcon fontSize="small"/></MyIconButton>
                    <MyIconButton aria-label="cancel" onClick={this.cancelEdit.bind(this)}><ClearIcon fontSize="small"/></MyIconButton>
                    <MyIconButton aria-label="done"><DoneIcon fontSize="small"/></MyIconButton>
                </Box>
            );
        }
        return (
            <Box></Box>
        );
    }
    
    deleteNote(){
        this.props.onDeleteNote(this.props.note.note_id);
    }

    cancelEdit(){
        this.setState({
            inEditMode: false,
        })
    }

    saveEdit(){
        console.log('finished edit');
        // TODO: add editing
    }

	render(){
	   const { timestamp, note, note_id} = this.props.note;
		 const { onDeleteNote } = this.props;

	   return (
            <Box display="flex" mb={1}>
                <MyPaper><Box display="flex" py={1} pr={1}>
                    <Box display="flex" flexDirection="column" px={1} justifyContent="center">
                        <Box>
                            <Link component="button" variant="body2">{formatTimestamp(timestamp)}</Link>
                        </Box>
                    </Box>
                    <Box display="flex" flexGrow={1}>
                        {this.renderMainBox()}
                    </Box>
                    <Box pl={1}>
                        {this.renderSideBar()}
                    </Box>
                </Box></MyPaper>
			</Box>
	   	);
   }
}