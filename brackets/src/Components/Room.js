import React, { useState, useEffect } from 'react';
import CreateRoom from './CreateRoom';
import SingleElimination from './SingleElim';
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router';

function Room(props){
    let history = useHistory()
    const roomCode = props.data.code;
    const csrftoken = getCookie('csrftoken');
    const [round, setRound] = useState(1);
    const maxUsers = props.data.max_users;
    const artist = props.data.artist;
    const bracket_type = props.data.bracket_type;
    const [host, setHost] = useState('');

     /*useEffect(() => {
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
        });
    }, [])*/

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

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