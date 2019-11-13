import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from "./backendapi";
import { Note } from "../injected/types";

// GET NOTES
type getNotesParams = {
  sort?: string;
  note_id?: number;
  video_id?: string;
  user_id?: number;
  timestamp?: number;
};

type getNotesResponse = {
  notes: Note[];
  num_notes: number;
};
export const getNotes = async (
  params: getNotesParams
): Promise<getNotesResponse | void> => getRequest("/notes", params);

// ADD NOTE
type addNotesParams = {
  note: string;
  video_id: string;
  user_id: number;
  timestamp: number;
};

export const addNote = async (params: addNotesParams): Promise<void> =>
  postRequest("/notes", params);

// DELETE NOTE
export const deleteNote = async (note_id: number): Promise<void> =>
  deleteRequest("/notes/" + note_id);

// EDIT NOTE
export type editNotesParams = {
  note: string;
  note_id: number;
  video_id: string;
  user_id: number;
  timestamp: number;
};

export const editNote = async (params: editNotesParams): Promise<void> => {
  if (!!params && !!params.note_id)
    return putRequest(`/notes/${params.note_id}`, params);
  else console.log("params for edit note is invalid, params: ", params);
};
