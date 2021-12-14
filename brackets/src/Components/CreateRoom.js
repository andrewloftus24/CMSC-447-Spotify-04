import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import GetCookie from './GetCookie';
import Room from './Room';

function CreateRoom(props){
    let history = useHistory();
    const csrftoken = GetCookie('csrftoken');
    const [maxUsers, setMaxUsers] = useState(0);
    const [artist, setArtist] = useState("");
    const [bracketType, setBracketType] = useState("");
    const [created, setCreated] = useState(false);

    useEffect(() => {
        if(created){
            StartVotes();
            Start();
        }
    }, [created])



    async function Start(){
        const requestOptions = {
            method: 'POST',
            headers: {"Content-type" : "application/json", 'X-CSRFToken': csrftoken},
            body: JSON.stringify({
                max_users: maxUsers,
                artist: artist,
                bracket_type: bracketType
            }),
        };
        const response = await fetch('/start-room/', requestOptions)
        const data = await response.json();
        history.push({
            pathname: '/room/' + data.code,
            state: { roomInfo: data}
        });
    }

    async function StartVotes(){
        const response = await fetch('/api/initvotes/');
        const data = await response.text();
        window.console.log(data);
    }

    let optionsMenu = (
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-12">
                    <br/>
                    <br/>
                    <h3 class="h3 text-center">Create Room</h3>
                    <br/>
                    <br/>
                </div>
            </div>
            <div class="row">
                <div class="col p-2 border border-secondary">
                    <select class="form-control" id="type" onChange={() => setBracketType(document.getElementById('type').value)}>
                        <option disabled selected hidden>Choose Bracket Type</option>
                        <option>Single Elimination</option>
                        <option>Double Elimination</option>
                        <option>Round Robin</option>
                        <option>Multi-Stage</option>
                    </select>
                </div>
                <div class="col p-2 border border-secondary" align="center">
                    <input type="text" class="form-control" placeholder="Enter Artist Name" aria-label="Enter Artist Name" aria-describedby="basic-addon2" id="artistName"
                     onChange={() => setArtist(document.getElementById('artistName').value)}/>
                </div>
                <div class="col p-2 border border-secondary" align="center">
                    <input type="number" class="form-control" placeholder="Enter Lobby Size" aria-label="Enter Lobby Size" aria-describedby="basic-addon2" id="maxUsers"
                    onChange={() => setMaxUsers(document.getElementById('maxUsers').value)} />
                </div>
                <div class="col p-2 border border-secondary" align="center">
                    <button type="button" class="btn btn-primary" onClick={() => setCreated(!created)}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    )

    return (
        <div>
            {optionsMenu}
        </div>

    )

}

export default CreateRoom;