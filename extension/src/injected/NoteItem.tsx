import * as React from 'react';
import { Note } from './types';
import styled from 'styled-components';
import {NOTE_COLOR, TEXT_COLOR } from '../colorConstants';
import { MAX_CHARS } from '../constants';
import { editNotesParams } from '../api/notes';
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

interface Props {
    note: Note,
    onChangeVideoTime: (timestamp: number) => void,
    onDeleteNote: (note_id: number) => void,
    onEditNote: (note_params: editNotesParams) => Promise<void>,
}

interface State {
    inEditMode: boolean,
    textBoxValue: string,
}

export default class NoteItem extends React.Component<Props, State> {
	constructor(props){
		super(props);
		this.state = {
            inEditMode: false,
            textBoxValue: this.props.note.note,
		};
    }
    
    onTimestampClick(){
        this.props.onChangeVideoTime(this.props.note.timestamp)
    }
    
    deleteNote(){
        this.props.onDeleteNote(this.props.note.note_id);
    }

    cancelEdit(){
        this.setState({
            inEditMode: false,
            textBoxValue: this.props.note.note,
        })
    }

    async saveEdit(){
        const { note, onEditNote } = this.props;
        const { textBoxValue } = this.state;

        // only edit note if different
        if (textBoxValue !== note.note){
            await onEditNote({
                note: textBoxValue,
                note_id: note.note_id,
                video_id: note.video_id,
                user_id: note.user_id,
                timestamp: note.timestamp, 
            });
        }
        this.setState({inEditMode: false});
    }

	handleDoubleClick(){
		this.setState({inEditMode: true});
    }

    onTextBoxChange(event: React.ChangeEvent<HTMLTextAreaElement>){
        this.setState({ textBoxValue: event.target.value });    
    }

    onTextBoxKeyDown(event){
        if(event.keyCode == 13 && event.shiftKey == false) {
            event.preventDefault();
            // Only add notes with more than just spaces
            if (this.state.textBoxValue.trim().length) {
                this.saveEdit();
            } else {
                alert("You can't save an empty note!");
            }
        }

        // on escape key, cancel edit
        if (event.keyCode == 27){
            this.cancelEdit();
        }
    }


	renderMainBox(){
        if (this.state.inEditMode){
            return (
                <Box display="flex" flexGrow={1}>
                    <StyledTextArea 
                        maxLength={MAX_CHARS}
                        value={this.state.textBoxValue}
                        onChange={this.onTextBoxChange.bind(this)}
                        onKeyDown={this.onTextBoxKeyDown.bind(this)}/>
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
                {this.props.note.note}
            </MyTextDisplayBox>
		);
    }

    renderSideBar(){
        if (this.state.inEditMode){
            return (
                <Box display="flex" flexDirection="column" >
                    <MyIconButton aria-label="delete" onClick={this.deleteNote.bind(this)}><DeleteIcon fontSize="small"/></MyIconButton>
                    <MyIconButton aria-label="cancel" onClick={this.cancelEdit.bind(this)}><ClearIcon fontSize="small"/></MyIconButton>
                    <MyIconButton aria-label="done" onClick={this.saveEdit.bind(this)}><DoneIcon fontSize="small"/></MyIconButton>
                </Box>
            );
        }
        return (
            <Box></Box>
        );
    }

	render(){
	   const { timestamp } = this.props.note;

	   return (
            <Box display="flex" mb={1}>
                <MyPaper><Box display="flex" py={1} pr={1}>
                    <Box display="flex" flexDirection="column" px={1} justifyContent="center">
                        <Box>
                            <Link component="button" onClick={this.onTimestampClick.bind(this)}>{formatTimestamp(timestamp)}</Link>
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