import React, {useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect} from "react-router-dom";
import JoinRoom from './Components/JoinRoom';
import CreateRoom from './Components/CreateRoom';
import Room from './Components/Room';

function Home(props){
    const [roomCode, setRoomCode] = useState('0');
    const [authenticated, setAuthenticated] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        GetRoomCode();
        UserAuthenticated();
        //UserProfile();
        window.console.log(authenticated);
    }, [])

    async function GetRoomCode(){
        const response = await fetch('/room-code/');
        const data = await response.json();
        setRoomCode(data.code);
    }

    async function UserAuthenticated(){
        const response = await fetch('/api/authenticated/');
        const data = await response.text();
        setAuthenticated(data);
    }

    async function UserProfile(){
        const response = await fetch('/api/userinfo/');
        const data = await response.text();
        setUrl(data);
    }

    let title = (
        <div>
            <br/>
            <h1 class="display-1 text-center">Bracketfy</h1>
            <br/>
        </div>
    )

    /*
    <div class="row justify-content-md-center">
                    <div class="col-md-6 d-flex justify-content-center">
                        <a href = '/join'>
                        <button type="button" class="btn btn-outline-light btn-lg">
                            Join Room
                        </button>
                        </a>
                    </div>
                </div>
                <br />
                <div class="row justify-content-md-center">
                    <div class="col-md-6 d-flex justify-content-center">
                        <a href="/create">
                        <button type="button" class="btn btn-outline-light btn-lg">
                            Create Room
                        </button>
                        </a>
                    </div>
                </div>
    */

    /*
    <div class="form-row justify-content-md-center">
                                <div class="col-md-5 d-flex justify-content-center">
                                    <input type="text" class="form-control" placeholder="Enter Room Code" aria-label="Enter Room Code" aria-describedby="basic-addon2" id="roomCode" />
                                </div>
                            </div>
                            <br />
                            <div class="form-row justify-content-md-center">
                                <div class="col-md-5 d-flex justify-content-center">
                                    <button type="button" class="btn btn-primary" onClick={() => setRoomCode(document.getElementById('roomCode').value)}>Enter Room</button>
                                </div>
                            </div>
    */

    let homePageLoggedIn = (
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-md-12">
                        {title}
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <div class="col-md-6 justify-content-start">
                        <form>
                            <div class="form-row">
                                <div class="col">
                                    <h6 class="h6 text-center">Want to join a friend? Enter code below!</h6>
                                </div>
                            </div>
                            <br />
                            <JoinRoom />
                        </form>
                    </div>
                    <div class="col-md-6 justify-content-end">
                        <form>
                            <div class="form-row">
                                <div class="col">
                                    <h6 class="h6 text-center">Start a new game!</h6>
                                </div>
                            </div>
                            <br />
                            <CreateRoom />
                        </form>
                    </div>
                </div>
            </div>
    )

    let homePageNotLoggedIn = (
        <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-md-12">
                        <br/>
                        {title}
                        <br/>
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <div class="col-md-12">
                        <h3 class="h3 text-center">Log in with your Spotify Account to get started!</h3>
                    </div>
                </div>
            </div>
    )

    return(
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/'>{authenticated === "True" ? homePageLoggedIn : homePageNotLoggedIn}</Route>
                    <Route path='/join' component={JoinRoom} />
                    <Route path='/create' component={CreateRoom} />
                    <Route path='/room/:roomCode' component={Room} />
                </Switch>
            </BrowserRouter>
        </div>
    )

}

export default Home;