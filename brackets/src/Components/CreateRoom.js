import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import GetCookie from './GetCookie';
import Room from './Room';

function CreateRoom(props){
    let history = useHistory();
    const csrftoken = GetCookie('csrftoken');
    const [counter, setCounter] = useState(0);
    const [maxUsers, setMaxUsers] = useState(0);
    const [artist, setArtist] = useState("");
    const [bracketType, setBracketType] = useState("");
    const [songType, setSongType] = useState("");
    const [created, setCreated] = useState(false);
    const [playlist, setPlaylist] = useState("");
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        GrabPlaylists();
    }, [])

    useEffect(() => {
        if(created){
            StartVotes();
            Start();
        }
    }, [created])

    useEffect(() => {
        window.console.log(counter);
        setCounter(counter+1);
    }, [bracketType, songType, playlist, artist, maxUsers])

    async function Start(){
        window.console.log(songType)
        window.console.log(playlist);
        const requestOptions = {
            method: 'POST',
            headers: {"Content-type" : "application/json", 'X-CSRFToken': csrftoken},
            body: JSON.stringify({
                max_users: maxUsers,
                song_type: songType,
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

    async function GrabPlaylists(){
        const response = await fetch('/api/playlists/');
        const data = await response.json();
        setPlaylists(data.playlists);
    }

    let bracketSelect = (
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col md-4" />
                <div class="col md-4">
                    <select class="form-control" id="type" onChange={() => setBracketType(document.getElementById('type').value)}>
                        <option disabled selected hidden>Choose Bracket Type</option>
                        <option>Single Elimination</option>
                        <option>Double Elimination</option>
                        <option>Round Robin</option>
                        <option>Multi-Stage</option>
                    </select>
                </div>
                <div class="col md-4" />
            </div>
        </div>
    )

    let typeSelect = (
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col md-4" />
                <div class="col md-4">
                    <select class="form-control" id="songType" onChange={() => setSongType(document.getElementById('songType').value)}>
                        <option disabled selected hidden>Generate with</option>
                        <option>Artist</option>
                        <option>Playlist</option>
                    </select>
                </div>
                <div class="col md-4" />
            </div>
        </div>
    )

    let playlistSelect = (
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col md-4" />
                <div class="col md-4">
                    <select class="form-control" id="playlist" onChange={() => setArtist(document.getElementById('playlist').value)}>
                        <option disabled selected hidden>Select Playlist</option>
                        {playlists.map((name) => {
                            return(
                                <option>{name}</option>
                            )
                        })}
                    </select>
                </div>
                <div class="col md-4" />
            </div>
        </div>
    )

    let artistSelect = (
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col md-4" />
                <div class="col md-4">
                    <input type="text" class="form-control" placeholder="Enter Artist Name" aria-label="Enter Artist Name" aria-describedby="basic-addon2" id="artistName"
                     onChange={() => setArtist(document.getElementById('artistName').value)}/>
                </div>
                <div class="col md-4" />
            </div>
        </div>
    )

    let sizeSelect = (
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col md-4" />
                <div class="col md-4">
                    <input type="number" class="form-control" placeholder="Enter Lobby Size" aria-label="Enter Lobby Size" aria-describedby="basic-addon2" id="maxUsers"
                    onChange={() => setMaxUsers(document.getElementById('maxUsers').value)} />
                </div>
                <div class="col md-4" />
            </div>
        </div>
    )

    let createButton = (
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col md-4" />
                <div class="col md-4">
                    <button type="button" class="btn btn-primary" onClick={() => setCreated(!created)}>
                        Create
                    </button>
                </div>
                <div class="col md-4" />
            </div>
        </div>
    )

    return (
        <div>
            <br />
            <br />
            <h3 class="h3 text-center">Create Room</h3>
            <br />
            <br />
            {counter > 0 ? bracketSelect : ""}
            <br />
            {counter > 1 ? typeSelect : ""}
            <br />
            {counter > 2 && songType === "Playlist" ? playlistSelect : ""}
            <br />
            {counter > 2 && songType === "Artist" ? artistSelect : ""}
            <br />
            {counter > 3 ? sizeSelect : ""}
            <br />
            {counter > 4 ? createButton: ""}
        </div>

    )

}

export default CreateRoom;