export const getThumbnail = (video_id: string) => {
  if (video_id === null) return "";

  const results = video_id.match("[\\?&]v=([^&#]*)");
  const video = results === null ? video_id : results[1];

  return "http://img.youtube.com/vi/" + video + "/0.jpg";
};
