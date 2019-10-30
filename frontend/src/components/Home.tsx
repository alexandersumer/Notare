import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect, RouteComponentProps, RouteProps } from "react-router-dom";
import { SyntheticEvent } from "react";
import backendapi from "../api/backendapi";
import { AuthService } from "./App";

type HomeProps = {
    
}

interface HomeState {
    logged_out: boolean;
}

class Home extends React.Component {
    state: HomeState;

    constructor (props: React.Props<HomeProps>) {
       super(props);
       this.state = {
           logged_out: false
       }
    }

    logout = async (event: SyntheticEvent) => {
        event.preventDefault();
        console.log(localStorage.getItem("accessToken"));
        backendapi.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken');
        const backend_response = await backendapi.delete('/logout')
        AuthService.logout(() => {});
        this.setState({logged_out: true});
        console.log("here");
    };

    render() {
        console.log("logged out", this.state.logged_out);


        if (this.state.logged_out) {
            console.log("logging out");
            return <Redirect to={"/"} />;
        }

        return (
            <div>
                <h1>Home</h1>
                <nav>
                    <Link to="/Home">Home</Link>
                    <Link to="/Notes">Notes</Link>
                    <Link to="/Videos">Videos</Link>
                </nav>
                <button onClick={this.logout}>Logout</button>
            </div>
            
        );
    }
}

export default Home;