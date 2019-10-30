import * as React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect, RouteComponentProps, RouteProps } from "react-router-dom";


class Videos extends React.Component {

    render() {
      return (
        <div>    
            <h1>Videos</h1>  
            <div>
                <nav>
                    <Link to="/Home">Home</Link>
                    <Link to="/Notes">Notes</Link>
                    <Link to="/Videos">Videos</Link>
                </nav>
            </div>       
        </div>
      )
    }
}

export default Videos;

