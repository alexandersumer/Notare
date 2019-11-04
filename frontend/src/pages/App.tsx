import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import AboutUsPage from "./AboutUsPage";
import NotePage from "./NotePage";
import VideoPage from "./VideoPage";
import VideoNotesPage from './VideoNotesPage';
import Box from '@material-ui/core/Box';
import { styled as materialStyled } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import NotareWord from '../NotareWord.png';
import { PINK_COLOR } from "../colorConstants";


const FontStyleComponent = materialStyled(Box)({ 
  fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
});

const NavBarStyledComponent = materialStyled(Box)({ 
  backgroundColor: PINK_COLOR,
  height: 70,
});

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <FontStyleComponent>
            <NavBarStyledComponent display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
              <Box ml={3}><Link href="/"><img width="120px" height="30px" src={NotareWord}/></Link></Box>
              <Box><Link href="/Notes">Notes</Link></Box>
              <Box><Link href="/Videos">Videos</Link></Box>
              <Box mr={3}><Link href="/AboutUs">About us</Link></Box>
            </NavBarStyledComponent>
          </FontStyleComponent>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/Notes" component={NotePage} />
            <Route exact path="/Videos" component={VideoPage} />
            <Route exact path="/AboutUs" component={AboutUsPage} />
            <Route exact path="/VideoNotes/:video_id" component={VideoNotesPage}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
