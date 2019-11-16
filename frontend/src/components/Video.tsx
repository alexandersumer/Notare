import { VideoType } from "../types";
import React from "react";
import Box from "@material-ui/core/Box";
import { PINK_COLOR } from "../colorConstants";
import { styled as materialStyled } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Thumbnail from "./Thumbnail";

const VideoStyledComponent = materialStyled(Box)({
    width: "400px",
    backgroundColor: PINK_COLOR
  });

interface Props {
    video: VideoType;
    categories: string[];
}

interface State {
    inputValue: string;
}

class VideoComponent extends React.Component<Props, State> {
    constructor(props: Props, state: State){
        super(props, state);
        this.state = {
            inputValue: this.props.video.categories,
        }
    }
    render(){
        const { video, categories } = this.props;

        return(
            <VideoStyledComponent
              key={video.video_id}
              m={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Box p={1} display="flex" flexWrap="wrap">
                <Thumbnail video_id={video.video_id} />
              </Box>
              <Box p={1} display="flex" flexWrap="wrap">
                {video.video_title}
              </Box>
              <Box p={1} display="flex" flexWrap="wrap">
                <Link to={`/VideoNotes/${video.video_id}`}>[View all notes]</Link>
              </Box>
              <Box>In collection: {video.categories}</Box>
            </VideoStyledComponent>
        )
    }
}


export default VideoComponent;