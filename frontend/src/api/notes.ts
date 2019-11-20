import { getRequest } from "./backendapi";
import { NoteType } from "../types";

// GET NOTES
type getNotesParams = {
  sort?: string;
  note_id?: number;
  video_id?: string;
  timestamp?: number;
};

type getNotesResponse = {
  notes: NoteType[];
  num_notes: number;
};

export const getNotes = async (
  params: getNotesParams
): Promise<getNotesResponse | void> => getRequest("/notes", params);
