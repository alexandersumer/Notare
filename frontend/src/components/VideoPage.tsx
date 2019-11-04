import React from "react";
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import GetAppIcon from '@material-ui/icons/GetApp';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { styled as materialStyled } from '@material-ui/core/styles';
import backendapi from '../api/backendapi';

interface Props {

};

const FontStyleComponent = materialStyled(Box)({
    fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
  });
  
  const GREY_COLOR = "#766767";
  const RED_COLOR = "#FF5756";
  const PINK_COLOR = "#FCECE6";
  
  interface Props {
  
  };

  interface State {
    videos: Array<any>
  };
  
  const TestVideoComp = materialStyled(Box)({
    width: '400px',
    height: '100px',
    backgroundColor: PINK_COLOR,
  });
  
  const GreyFont = materialStyled(Box)({
    color: GREY_COLOR,
  });

  const dummy_data = [
        {
            video_id: "LlW7Es7gStA",
            video_title: "Pewdiepie is nuts",
            thumbnail: ""
        },
        { 
            video_id: "QLx2WZWilBc",
            video_title: "United States Grand Prix",
            thumbnail: ""
        }
    ]

class VideoPage extends React.Component<Props> {
    state: State
    constructor(props: Props){
        super(props);
        this.state = {
            //videos: dummy_data
            videos: []
        }
    }

    Youtube = function () {
        let video, results;
    
        const getThumb = function (url: string, size: string) {
            if (url === null) {
                return '';
            }
    
            size    = (size === null) ? 'big' : size;
            results = url.match('[\\?&]v=([^&#]*)');
            video   = (results === null) ? url : results[1];
    
            if (size === 'small') {
                return 'http://img.youtube.com/vi/' + video + '/2.jpg';
            } 
            
            return 'http://img.youtube.com/vi/' + video + '/0.jpg';
        };
    
        return {
            thumb: getThumb
        };
    }();
    

    getVideos = async () => {
        backendapi.defaults.headers.common['Authorization'] = 'Bearer ' + 'TODO add access token here';
        const backend_response = await backendapi.get('/videos', {
            params: {
                user_id: 1
            }
        });
        if (backend_response.status === 200) {
            const thumbnail_videos = backend_response.data.videos.map((video: any) => {
                video.thumbnail = this.Youtube.thumb('http://www.youtube.com/watch?v='+video.video_id, 'small');
                return video;
            });
            this.setState({videos: thumbnail_videos})
        }
    }

    componentDidMount() {
      this.getVideos();
    }
  
    renderMain(){
      const numVideos = this.state.videos.length; 
      if (numVideos){
        return (
          <Box display="flex" flexWrap="wrap">
                {this.state.videos.map((video) => (
                  <TestVideoComp key={video.video_id} m={1}>
                    {video.video_title}
                    <img 
                        src={video.thumbnail}
                        alt="video"
                    />
                  </TestVideoComp>
                ))}
          </Box>
        )
      }
  
      const TryNotareBox = materialStyled(Box)({
        width: '300px',
        height: '60px',
        backgroundColor: RED_COLOR,
        color: "white",
      });
  
      return (
        <GreyFont display="flex" style={{ height: "100%" }} alignItems="center" flexDirection="center" justifyContent="center">
          <Box display="flex"  alignItems="center" flexDirection="column" justifyContent="center">
            <Box>Looks like you have no videos yet!</Box>
            <Box mt={4}>Make sure to install the Chrome extension and head to Youtube to get started.</Box>
            <Box mt={3}><Button variant="contained" color="secondary">Try Notare Now <GetAppIcon/></Button></Box>
          </Box>
        </GreyFont>
      );
    }
  
    render(){
      return (
          <FontStyleComponent p={3}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Box mr={4}><h1>My Videos</h1></Box>
              <Box mr={2}><SearchIcon/></Box>
              <TextField style={{width: "600px"}} type="search" margin="normal" label="Search by video name..."/>
            </Box>
            <Box>
              <h3 style={{color: RED_COLOR}}>Recent Videos</h3>
              {this.renderMain()}
            </Box>
          </FontStyleComponent>
      );
    }
  }
  
  export default VideoPage;
  