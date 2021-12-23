import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import GetCookie from './GetCookie';

function JoinRoom(props){
    let history = useHistory();
    const [roomCode, setRoomCode] = useState('0');
    const [error, setError] = useState('');
    const csrftoken = GetCookie('csrftoken');

    useEffect(() => {
        if(roomCode != '0'){
            handleRoomJoinButton();
        }
    }, [roomCode])

    useEffect(() => {

    }, [error])

    const handleRoomJoinButton = () => {
        window.console.log(roomCode);
        const requestOptions = {
            method: 'POST',
            headers: {"Content-type" : "application/json", 'X-CSRFToken': csrftoken},
            body: JSON.stringify({
                code: roomCode
            }),
        };
        fetch('/join-room/', requestOptions)
        .then((response) => {
            if (response.ok) {
                history.push(`/room/${roomCode}`)
            } else{
                setError("Room not found.")
            }

        }).then((data) => setError("Room not found."))
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-8 d-flex justify-content-center">
                    <input type="text" class="form-control" placeholder="Enter Room Code" aria-label="Enter Room Code" aria-describedby="basic-addon2" id="roomCode" />
                </div>
            </div>
            <br />
            <div class="row justify-content-md-center">
                <div class="col-md-4 d-flex justify-content-center">
                    <button type="button" class="btn btn-primary" onClick={() => setRoomCode(document.getElementById('roomCode').value)}>Enter Room</button>
                </div>
            </div>
            <br />
            <div class="row justify-content-md-center">
                <div class="col-md-8 d-flex justify-content-center">
                    {error}
                </div>
            </div>
        </div>
    )
}

export default JoinRoom;