import React, {useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect} from "react-router-dom";
import JoinRoom from './Components/JoinRoom';
import CreateRoom from './Components/CreateRoom';
import Room from './Components/Room';

function Home(props){
    const [roomCode, setRoomCode] = useState(null)

    useEffect(() => {
        GetRoomCode();
    }, [])

    async function GetRoomCode(){
        const response = await fetch('/room-code/');
        const data = await response.json();
        setRoomCode(data.code);
    }

    let homePage =  (
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-md-12">
                        <br/>
                        <br/>
                        <h3 class="h3 text-center">BracketFy Home</h3>
                        <br/>
                        <br/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <p>      </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-2" />
                    <div class="col-sm-3 text-center">
                        <a href = '/join'>
                        <button type="button" class="btn btn-primary">
                            Join Room
                        </button>
                        </a>
                        <br/>
                        <br/>
                    </div>
                    <div class="col-sm-2" />
                    <div class="col-sm-3 text-center">
                        <a href="/create">
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
                    <Route path='/create' component={CreateRoom} />
                    <Route path='/room/:roomCode' component={Room} />
                </Switch>
            </BrowserRouter>
        </div>
    )

}

export default Home;