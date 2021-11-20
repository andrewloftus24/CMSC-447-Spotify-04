import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function JoinRoom(props){
    const [roomCode, setRoomCode] = useState('');
    const [error, setError] = useState('');
    const csrftoken = getCookie('csrftoken');

    const handleRoomCodeInput = (event) => {
        setRoomCode(event.target.value)
    }

    const handleRoomBackButton = (event) => {
        props.history.push('/bracket');
    }

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

    const handleRoomJoinButton = () => {
        const requestOptions = {
            method: 'POST',
            headers: {"Content-type" : "application/json", 'X-CSRFToken': csrftoken},
            body: JSON.stringify({
                code: roomCode
            }),
        };
        fetch('/join-room/?' + new URLSearchParams({
            code: roomCode
        }))
        .then((response) => {
            if (response.ok) {
                props.history.push(`/room/${roomCode}`)
            } else{
                setError("Room not found.")
            }
        }).catch((error) => {
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
                    <button type="button" class="btn btn-primary" onClick={handleRoomJoinButton}>Enter Room</button>
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