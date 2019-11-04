import React from "react";
import Box from '@material-ui/core/Box';
import { getThumbnail } from '../utils/YoutubeUtils';

interface Props {
  src: string,
  width?: number,
  height?: number,
}
const Thumbnail = (props: Props) => {
  const width = (props.width || 120);
  const height = (props.height || 80);
  return (
      <Box maxWidth="sm">
        <img src={getThumbnail(props.src)} width={width+'px'} height={height+'px'} alt="new"/>
      </Box>
  );
}

export default Thumbnail;