import React from "react";
import Link from "@material-ui/core/Link";

const getYoutubeTimeLink = (video_id: string, timestamp: number): string =>
  `https://youtu.be/${video_id}?t=${Math.floor(timestamp)}`;

interface Props {
  videoId: string;
  timestamp: number;
  children?: React.ReactNode;
}

const YoutubeLink = (props: Props) => (
  <Link
    href={getYoutubeTimeLink(props.videoId, props.timestamp)}
    target="_blank"
  >
    {props.children}
  </Link>
);

export default YoutubeLink;
