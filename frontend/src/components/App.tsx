import * as React from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { render } from "react-dom";
import { Home } from "./Home"
import { Notes } from "./Notes"
import { Videos } from "./Videos"
import "./style.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/Notes">Notes</Link>
            <Link to="/Videos">Videos</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Notes" component={Notes} />
            <Route exact path="/Videos" component={Videos} />
          </Switch>
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById("root"));
