import * as React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect, RouteComponentProps, RouteProps } from "react-router-dom";


class Notes extends React.Component {

    render() {
      return (
        <div>    
            <h1>Notes</h1>  
            <div>
                <nav>
                    <Link to="/Home">Home</Link>
                    <Link to="/Notes">Notes</Link>
                    <Link to="/Collections">Collections</Link>
                </nav>
            </div>       
        </div>
      )
    }
}

export default Notes;

