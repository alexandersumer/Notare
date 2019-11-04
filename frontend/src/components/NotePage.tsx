import React from "react";
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import GetAppIcon from '@material-ui/icons/GetApp';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { styled as materialStyled } from '@material-ui/core/styles';

const FontStyleComponent = materialStyled(Box)({
  fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
});

const GREY_COLOR = "#766767";
const RED_COLOR = "#FF5756";
const PINK_COLOR = "#FCECE6";

interface Props {

};

const TestNoteComp = materialStyled(Box)({
  width: '400px',
  height: '100px',
  backgroundColor: PINK_COLOR,
});

const GreyFont = materialStyled(Box)({
  color: GREY_COLOR,
});

class NotePage extends React.Component<Props> {
  constructor(props: Props){
      super(props);
  }

  renderMain(){
    const numNotes = 0; // TODO: change so we actually use number of notes
    if (numNotes){
      return (
        <Box display="flex" flexWrap="wrap">
              {[1,2,3,4,5,6,7,8,9,0].map(() => (<TestNoteComp m={1}>butts</TestNoteComp>))}
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
          <Box>Looks like you have no notes yet!</Box>
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
            <Box mr={4}><h1>My Notes</h1></Box>
            <Box mr={2}><SearchIcon/></Box>
            <TextField style={{width: "600px"}} type="search" margin="normal" label="Search by note content and video name..."/>
          </Box>
          <Box>
            <h3 style={{color: RED_COLOR}}>Recent Notes</h3>
            {this.renderMain()}
          </Box>
        </FontStyleComponent>
    );
  }
}

export default NotePage;
