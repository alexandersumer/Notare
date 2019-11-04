import * as React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import AboutUsPage from "./AboutUsPage";
import NotePage from "./NotePage";
import VideoPage from "./VideoPage";


class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/Notes">Notes</Link>
            <Link to="/Videos">Videos</Link>
            <Link to="/AboutUs">About us</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/Notes" component={NotePage} />
            <Route exact path="/Videos" component={VideoPage} />
            <Route exact path="/AboutUs" component={AboutUsPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
