import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GetCookie from './GetCookie';

function JoinRoom(props){
    const [roomCode, setRoomCode] = useState('0');
    const [error, setError] = useState('');
    const csrftoken = GetCookie('csrftoken');

    useEffect(() => {
        if(roomCode != '0'){
            handleRoomJoinButton();
        }
    }, [roomCode])

    const handleRoomBackButton = (event) => {
        props.history.push('/bracket');
    }

    const handleRoomJoinButton = () => {
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
                props.history.push(`/room/${roomCode}`)
            } else{
                setError("Room not found.")
            }

        }).then((data) => console.log(data))
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-12">
                    <h4 class="h4 text-center">Join Room</h4>
                </div>
            </div>
            <div class="row justify-content-md-center">
                <div class="col-md-12">
                    <input type="text" class="form-control" placeholder="Enter Room Code" aria-label="Enter Room Code" aria-describedby="basic-addon2" id="roomCode" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-5 justify-content-md-right">
                    <button type="button" class="btn btn-primary" onClick={() => setRoomCode(document.getElementById('roomCode').value)}>Enter Room</button>
                </div>
                <div class="col-md-2" />
                <div class="col-md-5 justify-content-md-left">
                     <button type="button" class="btn btn-primary" onClick={handleRoomBackButton}>Go Back</button>
                </div>
            </div>
        </div>
    )
}

export default JoinRoom;