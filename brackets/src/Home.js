import React, {useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect} from "react-router-dom";
import JoinRoom from './Components/JoinRoom';
import CreateRoom from './Components/CreateRoom';
import Room from './Components/Room';

function Home(props){
    const [roomCode, setRoomCode] = useState(null)

    useEffect(() => {
        fetch('/room-code/')
        .then(response => response.json())
        .then(data => setRoomCode(data.code))
    })

    let homePage =  (
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-md-12">
                        <h3 class="h3 text-center">BracketFy Home</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <p>      </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-2" />
                    <div class="col-sm-3 justify-content-md-right">
                        <a href='/join'>
                        <button type="button" class="btn btn-primary">
                            Join Room
                        </button>
                        </a>
                    </div>
                    <div class="col-sm-2" />
                    <div class="col-sm-3">
                        <a href='/create'>
                        <button type="button" class="btn btn-primary">
                            Create Room
                        </button>
                        </a>
                    </div>
                    <div class="col-sm-2" />
                </div>
            </div>
    )

    return(
        <div>
            <BrowserRouter>
            <Switch>
                <Route exact path='/bracket'>{homePage}</Route>
                <Route path='/join' component={JoinRoom} />
                <Route path='/create'>
                    <CreateRoom
                        maxUsers = {4}
                        artist = {"Michael Jackson"}
                        bracketType = {"Single Elimination"}
                    />
                </Route>
                <Route path='/room/:roomCode' component={Room} />
            </Switch>
        </BrowserRouter>
        </div>
    )

}

export default Home;