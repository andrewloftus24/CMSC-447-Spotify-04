import React, { useState, useEffect } from 'react';
import CreateRoom from './CreateRoom';
import SingleElimination from './SingleElim';
import GetCookie from './GetCookie';
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router';


function Room(props){
    let history = useHistory();
    console.log(props.match.params.roomCode);
    const roomCode = props.match.params.roomCode;
    const csrftoken = GetCookie('csrftoken');
    const [round, setRound] = useState(1);
    const [maxUsers, setMaxUsers] = useState(0);
    const [artist, setArtist] = useState("");
    const [bracketType, setBracketType] = useState("");
    const [host, setHost] = useState('');

     function GetRoom(){
        fetch('/get-room/' + '?roomcode=' + roomCode)
        .then((response) => {
            if(!response.ok){
                console.log("State: " + response.statusText)
                history.push("/bracket")
            }
            return response.json()
        })
        .then((data) => {
            setHost(data.is_host);
            setArtist(data.artist);
            setMaxUsers(data.max_users);
            setBracketType(data.bracket_type);
        });
    }

    GetRoom();

    const handleLeaveRoom = () => {
        const requestOptions = {
            method: 'POST',
            headers: {"Content-type": "application/json", 'X-CSRFToken': csrftoken}
        }
        fetch('/leave-room/', requestOptions)
            .then(response => {
                history.push("/bracket")
                window.location.reload()
            }
            )
    }

    let renderBracket = (
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-md-12">
                        <h3 class="h3 text-center">Code: {roomCode}</h3>
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <div class="col-md-12">
                        <SingleElimination artist={artist} />
                    </div>
                </div>
                <div class="row justify-content-md-right">
                    <div class="col-md-12">
                        <button type="button" class="btn btn-primary" onClick={handleLeaveRoom}>
                            Leave Room
                        </button>
                    </div>
                </div>
            </div>
        )

    return(
        <div>
            {renderBracket}
        </div>
    )
}

export default withRouter(Room);