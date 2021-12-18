import React, { useState, useEffect } from 'react';
import CreateRoom from './CreateRoom';
import SingleElimination from './SingleElim';
import GetCookie from './GetCookie';
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router';


function Room(props){
    let history = useHistory();
    const roomCode = props.match.params.roomCode;
    const csrftoken = GetCookie('csrftoken');
    const [round, setRound] = useState(1);
    const [maxUsers, setMaxUsers] = useState(0);
    const [artist, setArtist] = useState("");
    const [bracketType, setBracketType] = useState("");
    const [isHost, setIsHost] = useState(false);
    const [started, setStarted] = useState(false);
    const [playerList, setPlayerList] = useState([]);

    useEffect(() => {
        GetRoom();
    }, [started])



    useEffect(() => {
        const interval = setInterval(() => {
            GetUsers();
        }, 4000);
        return () => clearInterval(interval);
    }, [started])

    const handleLeaveRoom = () => {
        ClearVotes();
        const requestOptions = {
            method: 'POST',
            headers: {"Content-type": "application/json", 'X-CSRFToken': csrftoken}
        }
        fetch('/leave/', requestOptions)
            .then(response => {
                history.push("/bracket")
                window.location.reload()
            }
            )
    }

    async function GetUsers(){
        const response = await fetch('/users/' + '?code=' + roomCode);
        const data = await response.json();
        setPlayerList(data.users);
    }

    async function GetRoom(){
        const response = await fetch('/get-room/' + '?roomcode=' + roomCode);
        const data = await response.json();
        setMaxUsers(data.max_users);
        setArtist(data.artist);
        setBracketType(data.bracket_type);
        setIsHost(data.is_host);
    }

    async function ClearVotes(){
        const response = await fetch('/api/reset/');
        const data = await response.text();
        window.console.log(data);
    }

    let startButton = (
        <div>
            <button type="button" class="btn btn-primary" onClick={() => setStarted(!started)}>
                Start Match
            </button>
            <br/>
            <br/>
        </div>
    )

    let notStarted = (
        <div>
            <h3 class="h3 text-center">Code: {roomCode}</h3>
            <br />
            <h4 class="h4 text-center">Share this code with your friends!</h4>
            <h4 class="h4 text-center">Wait for them all to join, then everyone press start!</h4>
            <br />
        </div>
    )

    let renderBracket = (
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-md-12">
                        <br/>
                        <br/>
                        {started ? "" : notStarted}
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <div class="col-md-12 text-center">
                        {started ? <SingleElimination artist={artist} songs={[]} round={round}/> : startButton}
                    </div>
                </div>
            </div>
    )

    let playerListTitle = (
        <div class="row justify-content-md-center">
            <div class="col-md-12">
                <h5 class="h5 text-center">Player List</h5>
            </div>
        </div>
    )

    let console = (
        <div class = "fixed-bottom">
            <div class = "container">
                <div class="row justify-content-md-center">
                    <div class="col-md-12">
                        <button type="button" class="btn btn-primary float-right" onClick={handleLeaveRoom}>
                            Leave Room
                        </button>
                    </div>
                </div>
                {started ? "" : playerListTitle}
                {started ? "" : playerList.map((user) => {
                    return(
                        <div class="row justify-content-md-center">
                            <div class="col-md-12">
                                <h6 class="h6 text-center">{user}</h6>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )

    return(
        <div>
            {renderBracket}
            {console}
        </div>
    )
}

export default withRouter(Room);