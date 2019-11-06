export type NoteType = {
  note_id: number;
  note: string;
  user_id: number;
  video_id: string;
  timestamp: number;
  video_title: string;
};

export type VideoType = {
  video_id: string;
  user_id: number;
  video_title: string;
  categories: string;
  notes_ids: [number];
  notes_count: number;
};
