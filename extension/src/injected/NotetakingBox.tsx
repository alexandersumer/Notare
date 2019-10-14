import * as React from 'react';
import styled from 'styled-components';
import NoteList from './NoteList';
import {BACKGROUND_COLOR, NOTE_COLOR, PRIMARY_COLOR, TEXT_COLOR } from '../colorConstants';

const StyledWrapper = styled.div`
    background-color: ${BACKGROUND_COLOR};
    border: 2px solid ${PRIMARY_COLOR};
    font-size: 20px;
    height: 500px;
    width: 300px;
    padding: 20px;
`;

const StyledTextArea = styled.textarea`
    width: 100%;
    height: 150px;
    margin-bottom: 20px;
    color: ${TEXT_COLOR};
    background-color: ${NOTE_COLOR};
    font-size: 18px;
    border: none;
    resize: none;
`;

interface AppProps {}

interface AppState {
    textBoxValue: string,
    allNotes: string[];
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

    addNote(){
        const state = this.state;
        const today = new Date();   
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        this.setState(state => {
            const newNote = `${time} - ${state.textBoxValue}`;
            const notes = [newNote, ...state.allNotes];
            return {
                textBoxValue: '',
                allNotes: notes,
            };
          });
    }

    handleChange(event){
        this.setState({textBoxValue: event.target.value});
    }

    onKeyDown(event){
        if(event.keyCode == 13 && event.shiftKey == false) {
            event.preventDefault();
            this.addNote();
        }
    }

    componentDidMount() {
        // Example of how to send a message to eventPage.ts.
        chrome.runtime.sendMessage({ popupMounted: true });
    }

    render() {
        const { allNotes, textBoxValue } = this.state;
        return (
            <StyledWrapper>
                <h1>Notare</h1>
                {/*Some text box type*/}
                <StyledTextArea value={textBoxValue} onChange={this.handleChange} onKeyDown={this.onKeyDown}/>
                <h2>Your Notes</h2>
                <NoteList notesList={allNotes}/>
            </StyledWrapper>
        );
    }
}
