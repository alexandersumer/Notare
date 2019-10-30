import * as React from 'react';
import styled from 'styled-components';
import NoteList from './NoteList';
import { BACKGROUND_COLOR, NOTE_COLOR, PRIMARY_COLOR, TEXT_COLOR } from '../colorConstants';
import { MAX_CHARS } from '../constants';
import {editNotesParams, getNotes, addNote, deleteNote, editNote } from '../api/notes';
import { Note } from './types';

const USER_ID = 1; // for testing

const StyledWrapper = styled.div`
background-color: ${BACKGROUND_COLOR};
font-size: 20px;
height: 500px;
width: 300px;
padding: 20px;
`;

const StyledTextArea = styled.textarea`
padding: 20px;
box-sizing: border-box;
width: 100%;
height: 150px;
margin-top: 10px;
margin-bottom: 20px;
color: ${TEXT_COLOR};
background-color: ${NOTE_COLOR};
font-size: 12px;
border: none;
resize: none;
`;

interface AppProps {
    video: HTMLMediaElement,
}

interface AppState {
    textBoxValue: string,
    allNotes: Note[],
}

const getCurrentYoutubeId = () : string => {
    // gets the youtube id (no url!). e.g. EG29YjLC7aM
    var video_id = window.location.search.split('v=')[1];
    var ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id;
}

export default class NotetakingBox extends React.Component<AppProps, AppState> {
    constructor(props: AppProps, state: AppState) {
        super(props, state);
        this.state = {
            textBoxValue: '',
            allNotes: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    onChangeVideoTime(timestamp: number){
        this.props.video.currentTime = timestamp;
    }

    async getVidNotes(): Promise<void | Note[]> {
        const response = await getNotes({
            sort: "-timestamp",
            user_id: USER_ID,
            video_id: getCurrentYoutubeId(),
        });
        if (response) return response.notes;
        return undefined;
    }
    
    async addNote(){
        const state = this.state;
        const video = this.props.video;
        
        await addNote({
            note: state.textBoxValue,
            user_id: USER_ID,
            video_id: getCurrentYoutubeId(),
            timestamp: video.currentTime,
        });
        
        const newNotes = await this.getVidNotes();
        if (newNotes){
            this.setState({ 
                textBoxValue: '',
                allNotes: newNotes,
            });
        }
    }
    
    async deleteNote(note_id: number){
        await deleteNote(note_id);
        
        const newNotes = await this.getVidNotes();
        if (newNotes){
            this.setState({ 
                textBoxValue: '',
                allNotes: newNotes,
            });
        }
    }
    
    async onEditNote(note_params: editNotesParams): Promise<void>{
        await editNote(note_params);
        
        const newNotes = await this.getVidNotes();
        !!newNotes && this.setState({ allNotes: newNotes });
    }
    
    handleChange(event: React.ChangeEvent<HTMLTextAreaElement>){
        this.setState({textBoxValue: event.target.value});
    }
    
    onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>){
        if(event.keyCode == 13 && event.shiftKey == false) {
            event.preventDefault();
            if (this.state.textBoxValue.trim().length) {
                // Only add notes with more than just spaces
                this.addNote();
            } else {
                // empty text box anyway
                this.setState({
                    textBoxValue: '',
                })
            }
        }
    }
    
    async componentDidMount() {
        // Example of how to send a message to eventPage.ts.
        chrome.runtime.sendMessage({ popupMounted: true });
        
        const newNotes = await this.getVidNotes();
        if (newNotes){
            this.setState({ 
                textBoxValue: '',
                allNotes: newNotes,
            });
        }
    }
    
    render() {
        const { allNotes, textBoxValue } = this.state;
        return (
            <StyledWrapper>
            <img width={'120px'} height={'30px'} src={chrome.runtime.getURL('NotareWord.png')}></img>
            <img width={'50px'} height={'50px'} src={chrome.runtime.getURL('NotareCircleTransparent.png')}></img>
            <StyledTextArea 
                placeholder="Start typing here..."
                maxLength={MAX_CHARS}
                value={textBoxValue}
                onChange={this.handleChange}
                onKeyDown={this.onKeyDown}/>
            <h2>Your Notes</h2>
            <NoteList notesList={allNotes}
                onDeleteNote={this.deleteNote.bind(this)}
                onEditNote={this.onEditNote.bind(this)}
                onChangeVideoTime={this.onChangeVideoTime.bind(this)}/>
            </StyledWrapper>
        );
    }
}
