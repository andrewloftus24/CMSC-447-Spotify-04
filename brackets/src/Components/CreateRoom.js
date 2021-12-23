import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import GetCookie from './GetCookie';
import Room from './Room';

function CreateRoom(props){
    let history = useHistory();
    const csrftoken = GetCookie('csrftoken');
    const [counter, setCounter] = useState(0);
    const [maxUsers, setMaxUsers] = useState(0);
    const [filter, setFilter] = useState("");
    const [bracketType, setBracketType] = useState("");
    const [songType, setSongType] = useState("");
    const [created, setCreated] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [songs, setSongs] = useState("");
    const [roomCode, setRoomCode] = useState("");

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
        if(roomCode.length > 0){
            let url = '';
            if(songType === "Artist"){
                url = '/api/toptracks/?';
            }
            else if(songType === "Playlist"){
                url = '/api/playlisttracks/?';
            }
            else if(songType === "Album"){
                url = '/api/albumtracks/?';
            }
            GrabTracks(url);
        }
    }, [roomCode])

    useEffect(() => {
        if(songs === "Uploaded"){
            history.push({
                pathname: '/room/' + roomCode
            });
        }
    }, [songs])

    useEffect(() => {
        window.console.log(counter);
        setCounter(counter+1);
    }, [bracketType, songType, filter, maxUsers])

    async function Start(){
        window.console.log(songType)
        const requestOptions = {
            method: 'POST',
            headers: {"Content-type" : "application/json", 'X-CSRFToken': csrftoken},
            body: JSON.stringify({
                max_users: maxUsers,
                song_type: songType,
                artist: filter,
                bracket_type: bracketType
            }),
        };
        const response = await fetch('/start-room/', requestOptions)
        const data = await response.json();
        setRoomCode(data.code);
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

    async function GrabTracks(url) {
        const response = await fetch(url + new URLSearchParams({
            artist: filter,
            num: 8,
            code: roomCode
        }));
        const data = await response.text();
        setSongs(data);
    }

    let bracketSelect = (
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col md-8 d-flex justify-content-center">
                    <select class="form-control" id="type" onChange={() => setBracketType(document.getElementById('type').value)}>
                        <option disabled selected hidden>Choose Bracket Type</option>
                        <option>Single Elimination</option>
                        <option>Double Elimination</option>
                        <option>Round Robin</option>
                        <option>Multi-Stage</option>
                    </select>
                </div>
            </div>
        </div>
    )

    let typeSelect = (
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col md-8 d-flex justify-content-center">
                    <select class="form-control" id="songType" onChange={() => setSongType(document.getElementById('songType').value)}>
                        <option disabled selected hidden>Generate with</option>
                        <option>Artist</option>
                        <option>Playlist</option>
                        <option>Album</option>
                    </select>
                </div>
            </div>
        </div>
    )

    let playlistSelect = (
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col md-8 d-flex justify-content-center">
                    <select class="form-control" id="playlist">
                        <option disabled selected hidden>Generate with</option>
                        {playlists.map((name) => {
                            return(
                                <option>{name}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <br />
            <div class="row justify-content-md-center">
                <div class="col-md-4 d-flex justify-content-center">
                    <button type="button" class="btn btn-primary" onClick={() => setFilter(document.getElementById('playlist').value)}>Enter</button>
                </div>
            </div>
        </div>
    )

    let artistSelect = (
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-8 d-flex justify-content-center">
                    <input type="text" class="form-control" placeholder="Enter Name" aria-label="Enter Name" aria-describedby="basic-addon2" id="artistName"/>
                </div>
            </div>
            <br />
            <div class="row justify-content-md-center">
                <div class="col-md-4 d-flex justify-content-center">
                    <button type="button" class="btn btn-primary" onClick={() => setFilter(document.getElementById('artistName').value)}>Enter</button>
                </div>
            </div>
        </div>
    )

    let sizeSelect = (
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-8 d-flex justify-content-center">
                    <input type="number" class="form-control" placeholder="Enter Lobby Size" aria-label="Enter Lobby Size" aria-describedby="basic-addon2" id="maxUsers" />
                </div>
            </div>
            <br />
            <div class="row justify-content-md-center">
                <div class="col-md-4 d-flex justify-content-center">
                    <button type="button" class="btn btn-primary" onClick={() => setMaxUsers(document.getElementById('maxUsers').value)}>Enter</button>
                </div>
            </div>
        </div>
    )

    let createButton = (
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-4 d-flex justify-content-center">
                    <button type="button" class="btn btn-primary" onClick={() => setCreated(!created)}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    )

    let contents;

    if(counter === 1){
        contents = bracketSelect;
    }
    else if(counter === 2){
        contents = sizeSelect;
    }
    else if(counter === 3){
        contents = typeSelect;
    }
    else if(counter === 4){
        if(songType === "Playlist"){
            contents = playlistSelect;
        }
        else{
            contents = artistSelect;
        }
    }
    else{
        contents = createButton;
    }

    return (
        <div>
            {contents}
        </div>

    )

}

export default CreateRoom;