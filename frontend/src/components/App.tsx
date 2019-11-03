import * as React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Home } from "./Home";
import NotePage from "./NotePage";
import { Note } from "./Note";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/Notes">Notes</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Notes" component={Note} />
          </Switch>
          <NotePage/>
        </div>
      </Router>
    );
  }
}

export default App;
