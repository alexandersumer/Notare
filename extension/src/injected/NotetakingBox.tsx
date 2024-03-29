import * as React from "react";
import styled from "styled-components";
import NoteList from "./NoteList";
import * as $ from "jquery";
import { BACKGROUND_COLOR, NOTE_COLOR, TEXT_COLOR } from "../colorConstants";
import { MAX_CHARS } from "../constants";
import {
  editNotesParams,
  getNotes,
  addNote,
  deleteNote,
  editNote
} from "../api/notes";
import Box from "@material-ui/core/Box";
import { Note } from "./types";

const StyledTextArea = styled.textarea`
  padding: 10px;
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
  video: HTMLMediaElement;
}

interface AppState {
  textBoxValue: string;
  allNotes: Note[];
  youtubeId: string;
}

const getCurrentYoutubeId = (): string => {
  // gets the youtube id (no url!). e.g. EG29YjLC7aM
  var video_id = window.location.search.split("v=")[1];
  var ampersandPosition = video_id.indexOf("&");
  if (ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
  }
  return video_id;
};

export default class NotetakingBox extends React.Component<AppProps, AppState> {
  constructor(props: AppProps, state: AppState) {
    super(props, state);
    this.state = {
      textBoxValue: "",
      allNotes: [],
      youtubeId: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChangeVideoTime(timestamp: number) {
    this.props.video.currentTime = timestamp;
  }

  async getVidNotes(): Promise<void | Note[]> {
    const response = await getNotes({
      sort: "-timestamp",
      video_id: getCurrentYoutubeId()
    });
    if (response) return response.notes;
    return undefined;
  }

  async addNote() {
    const state = this.state;
    const video = this.props.video;

    const videoTitle = $("#container > h1 > yt-formatted-string")[0].innerText;

    await addNote({
      note: state.textBoxValue,
      video_id: state.youtubeId,
      video_title: videoTitle,
      timestamp: video.currentTime
    });

    const newNotes = await this.getVidNotes();
    if (newNotes) {
      this.setState({
        textBoxValue: "",
        allNotes: newNotes
      });
    }
  }

  async deleteNote(note_id: number) {
    await deleteNote(note_id);

    const newNotes = await this.getVidNotes();
    if (newNotes) {
      this.setState({
        textBoxValue: "",
        allNotes: newNotes
      });
    }
  }

  async onEditNote(note_params: editNotesParams): Promise<void> {
    await editNote(note_params);

    const newNotes = await this.getVidNotes();
    !!newNotes && this.setState({ allNotes: newNotes });
  }

  handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ textBoxValue: event.target.value });
  }

  onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.keyCode == 13 && event.shiftKey == false) {
      event.preventDefault();
      if (this.state.textBoxValue.trim().length) {
        // Only add notes with more than just spaces
        this.addNote();
      } else {
        // empty text box anyway
        this.setState({
          textBoxValue: ""
        });
      }
    }
  }

  async reload() {
    this.setState({
      youtubeId: getCurrentYoutubeId()
    });
    const newNotes = await this.getVidNotes();
    if (newNotes) {
      this.setState({
        textBoxValue: "",
        allNotes: newNotes
      });
    }
  }

  componentDidMount() {
    this.reload();
    chrome.runtime.onMessage.addListener(request => {
      if (request.tabChanged) {
        this.reload();
      }
    });
  }

  render() {
    const { allNotes, textBoxValue } = this.state;
    return (
      <Box>
        <StyledTextArea
          placeholder="Start typing here..."
          maxLength={MAX_CHARS}
          value={textBoxValue}
          onChange={this.handleChange}
          onKeyDown={this.onKeyDown}
        />
        <h3>Your Notes</h3>
        <Box p={1} />
        <NoteList
          notesList={allNotes}
          onDeleteNote={this.deleteNote.bind(this)}
          onEditNote={this.onEditNote.bind(this)}
          onChangeVideoTime={this.onChangeVideoTime.bind(this)}
        />
      </Box>
    );
  }
}
