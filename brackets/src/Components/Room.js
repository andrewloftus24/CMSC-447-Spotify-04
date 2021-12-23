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
    const [filter, setFilter] = useState("");
    const [bracketType, setBracketType] = useState("");
    const [songType, setSongType] = useState("");
    const [playlist, setPlaylist] = useState("");
    const [isHost, setIsHost] = useState(false);
    const [started, setStarted] = useState(false);
    const [playerList, setPlayerList] = useState(0);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        GetRoom();
        GetSongs();
    }, [])

    useEffect(() => {
        window.console.log(songs);
    }, [started])

    const handleStartMatch = () => {
        setStarted(true);
    }

    const handleLeaveRoom = () => {
        ClearVotes();
        const requestOptions = {
            method: 'POST',
            headers: {"Content-type": "application/json", 'X-CSRFToken': csrftoken}
        }
        fetch('/leave/', requestOptions)
            .then(response => {
                history.push("/")
                window.location.reload()
            }
            )
    }

    async function GetUsers(){
        const response = await fetch('/users/' + '?code=' + roomCode);
        const data = await response.text();
        setPlayerList(parseInt(data));
    }

    async function GetRoom(){
        const response = await fetch('/get-room/' + '?roomcode=' + roomCode);
        const data = await response.json();
        setMaxUsers(data.max_users);
        setFilter(data.artist);
        setBracketType(data.bracket_type);
        setSongType(data.song_type);
        setIsHost(data.is_host);
    }

    async function GetSongs(){
        const response = await fetch('/api/gettracks/?' + new URLSearchParams({
            code: roomCode
        }));
        const data = await response.json();
        setSongs(data);
    }

    async function ClearVotes(){
        const response = await fetch('/api/reset/');
        const data = await response.text();
        window.console.log(data);
    }

    let startButton = (
        <div>
            <button type="button" class="btn btn-primary" onClick={() => handleStartMatch()}>
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
                        {started ? <SingleElimination artist={filter} songs={songs} songType={songType} round={round}/> : startButton}
                    </div>
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