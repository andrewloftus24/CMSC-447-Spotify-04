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
        fetch('/get-room/' + '?roomcode=' + roomCode)
        .then((response) => response.json())
        .then((data) => {
            setMaxUsers(data.max_users);
            setArtist(data.artist);
            setBracketType(data.bracket_type);
            setIsHost(data.is_host);
        });
        fetch('/api/initvotes/?' + new URLSearchParams({
                num: 8
            }), {
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }

        })
            .then((response) => response.json())
            .then((data) => window.console.log(data));
    }, [started])



    useEffect(() => {
        const interval = setInterval(() => {
            fetch('/users/' + '?code=' + roomCode)
            .then((response) => response.json())
            .then((data) => {
                setPlayerList(data.users);
            });
        }, 4000);
        return () => clearInterval(interval);
    }, [started])

    window.console.log(playerList);

    const handleLeaveRoom = () => {
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

    let startButton = (
        <div>
            <button type="button" class="btn btn-primary" onClick={() => setStarted(!started)}>
                Start Match
            </button>
            <br/>
            <br/>
        </div>
    )

    let renderBracket = (
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-md-12">
                        {started ? "" : <h3 class="h3 text-center">Code: {roomCode}</h3>}
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <div class="col-md-12 text-center">
                        {started && isHost ? <SingleElimination artist={artist}/> : startButton}
                        {started && !isHost ? <SingleElimination artist={artist}/> : ""}
                    </div>
                </div>
            </div>
        )

    let console = (
        <div class = "fixed-bottom">
            <div class = "container">
                <div class="row justify-content-md-left">
                    <div class="col-md-12 text-center">
                        <button type="button" class="btn btn-primary" onClick={handleLeaveRoom}>
                            Leave Room
                        </button>
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <div class="col-md-12">
                        <h5 class="h5 text-center">Player List</h5>
                    </div>
                </div>
                {playerList.map((user) => {
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