import React, { useState, useEffect } from 'react';
import Submit from './Submit';

function SingleElimination(props){
    const artist = props.artist;
    const [songs, setSongs] = useState([]);
    const [user, setUser] = useState("");
    const [message, setMessage] = useState("");
    const [votesList, setVotesList] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        GrabSongs();
    }, [message, submitted]);

    async function GrabSongs() {
        const response = await fetch('/api/toptracks/?' + new URLSearchParams({
            artist: artist,
            num: 8,
        }));
        const data = await response.json();
        setSongs(data);
    }

    const handleVotes = (index) => {
        let votes = [...votesList];
        if(index % 2 != 0){
            votes[index-1] = 0;
        }
        else{
            votes[index+1] = 0;
        }
        votes[index] = 1;

        let msg = "You voted for " + songs[index] + "!";
        setMessage(msg);
        setVotesList(votes);
    }



    const handleSubmit = () => {
        setSubmitted(true);
    }

    let displayMessage = (
        <div>
            <h5 class="h5 text-center">{message}</h5>
        </div>
    )

    let bracket = (
        <div>
            <h3 class="h3 text-center">Single Elimination, Stage One</h3>
            <h5 class="h5 text-center">Pick your favorites, then click SUBMIT</h5>
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-sm-2" />
                    <div class="col-sm-3 p-2 border border-secondary" >
                        <button type="button" class={votesList[0] === 1 ? "btn btn-success" : "btn btn-primary-outline"} onClick={() => handleVotes(0)}>
                            {songs[0]}
                        </button>
                    </div>
                    <div class="col-sm-2" />
                    <div class="col-sm-3 p-2 border border-secondary" >
                        <button type="button" class={votesList[2] === 1 ? "btn btn-success" : "btn btn-primary-outline"} onClick={() => handleVotes(2)}>
                            {songs[2]}
                        </button>
                    </div>
                    <div class="col-sm-2" />
                </div>
                <div class="row justify-content-md-center">
                    <div class="col-sm-2" />
                    <div class="col-sm-3 p-2 border border-secondary" >
                        <button type="button" class={votesList[1] === 1 ? "btn btn-success" : "btn btn-primary-outline"} onClick={() => handleVotes(1)}>
                            {songs[1]}
                        </button>
                    </div>
                    <div class="col-sm-2" />
                    <div class="col-sm-3 p-2 border border-secondary" >
                        <button type="button" class={votesList[3] === 1 ? "btn btn-success" : "btn btn-primary-outline"} onClick={() => handleVotes(3)}>
                            {songs[3]}
                        </button>
                    </div>
                    <div class="col-sm-2" />
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <p>      </p>
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <div class="col-sm-2" />
                    <div class="col-sm-3 p-2 border border-secondary" >
                        <button type="button" class={votesList[4] === 1 ? "btn btn-success" : "btn btn-primary-outline"} onClick={() => handleVotes(4)}>
                            {songs[4]}
                        </button>
                    </div>
                    <div class="col-sm-2" />
                    <div class="col-sm-3 p-2 border border-secondary" >
                        <button type="button" class={votesList[6] === 1 ? "btn btn-success" : "btn btn-primary-outline"} onClick={() => handleVotes(6)}>
                            {songs[6]}
                        </button>
                    </div>
                    <div class="col-sm-2" />
                </div>
                <div class="row">
                    <div class="col-sm-2" />
                    <div class="col-sm-3 p-2 border border-secondary" >
                        <button type="button" class={votesList[5] === 1 ? "btn btn-success" : "btn btn-primary-outline"} onClick={() => handleVotes(5)}>
                            {songs[5]}
                        </button>
                    </div>
                    <div class="col-sm-2" />
                    <div class="col-sm-3 p-2 border border-secondary" >
                        <button type="button" class={votesList[7] === 1 ? "btn btn-success" : "btn btn-primary-outline"} onClick={() => handleVotes(7)}>
                            {songs[7]}
                        </button>
                    </div>
                    <div class="col-sm-2" />
                </div>
                <div class="row justify-content-md-center">
                    <div class="col-sm-12">
                        <br />
                        <br />
                        <br />
                        {displayMessage}
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <div class="col-sm-12">
                        <br />
                        <br />
                        <br />
                        <button type="button" class="btn btn-primary" onClick={() => handleSubmit()}>
                            SUBMIT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

    if(submitted){
        return(
            <div>
                <Submit numSongs={songs.length} votes={votesList} songs={songs} joinCode={props.joincode} />
            </div>
        )
    }
    return(
        <div>
            {bracket}
        </div>
    );
}

export default SingleElimination;