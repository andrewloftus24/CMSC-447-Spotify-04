import React, { useState, useEffect } from 'react';
import Submit from './Submit';
import './BracketStyle.scss';

function SingleElimination(props){
    const artist = props.artist;
    const [songs, setSongs] = useState(props.songs);
    const [user, setUser] = useState("");
    const [round, setRound] = useState(props.round);
    const [votesList, setVotesList] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);
    window.console.log(props.songType);
    useEffect(() => {
        if(round === 1){
            setEnd(8);
        }
        else if(round === 2){
            setStart(8);
            setEnd(12);
        }
        else if(round === 3){
            setStart(12);
            setEnd(14);
        }
        if(votesList.length === 0){
            let votes = [];
            for(var i = start; i < end; i++){
                votes.push(0);
            }
            setVotesList(votes);
        }
    }, []);

    useEffect(() => {

    }, [submitted])

    const handleVotes = (index) => {
        let votes = [...votesList];
        if(index % 2 != 0){
            votes[index-1] = 0;
        }
        else{
            votes[index+1] = 0;
        }
        votes[index] = 1;

        setVotesList(votes);
    }

    const handleSubmit = () => {
        setSubmitted(true);
    }

    let winnerMessage = (
        <div>
            <h5 class="h5 text-center">Single Elimination is Over! Winner is <b>{songs[14]}</b>!</h5>
        </div>
    )

    let submitButton = (
        <div>
            <button type="button" class="btn btn-primary" onClick={() => handleSubmit()}>
                SUBMIT
            </button>
        </div>
    )

    let bracket1 = songs.slice(0, 8);
    let bracket2 = songs.slice(8, 12);
    let bracket3 = songs.slice(12, 14);
    let bracket4 = songs[14];

    let bracket = (
        <div class="tournament-container">
            <h1 class="h3 text-center"><b>Single Elimination</b></h1>
            <h3 class="h4 text-center"><b>{artist}</b></h3>
            <br />
            <div class="tournament-headers">
                <h4>{round === 1 ? <b>Stage 1</b> : "Stage 1"}</h4>
                <h4>{round === 2 ? <b>Stage 2</b> : "Stage 2"}</h4>
                <h4>{round === 3 ? <b>Stage 3</b> : "Stage 3"}</h4>
                <h4>{round === 4 ? <b>Stage 4</b> : "Stage 4"}</h4>
            </div>
            <div class="tournament-brackets">
                <ul class="bracket bracket-1">
                {bracket1.map((name, index) => {
                            return (
                                <li class="team-item">
                                {round === 1 ?
                                    <button type="button" class={votesList[index] === 1 ? "btn btn-success" : "btn btn-primary-outline"} onClick={() => handleVotes(index)}>
                                        {bracket1[index]}
                                    </button>
                                : bracket1[index]}
                            </li>
                            );
                    })}
                </ul>
                <ul class="bracket bracket-2">
                {bracket2.map((name, index) => {
                            return (
                                <li class="team-item">
                                {round === 2 ?
                                    <button type="button" class={votesList[index] === 1 ? "btn btn-success" : "btn btn-primary-outline"} onClick={() => handleVotes(index)}>
                                        {bracket2[index]}
                                    </button>
                                : bracket2[index]}
                            </li>
                            );
                    })}
                </ul>
                <ul class="bracket bracket-3">
                    {bracket3.map((name, index) => {
                            return (
                                <li class="team-item">
                                {round === 3 ?
                                    <button type="button" class={votesList[index] === 1 ? "btn btn-success" : "btn btn-primary-outline"} onClick={() => handleVotes(index)}>
                                        {bracket3[index]}
                                    </button>
                                : bracket3[index]}
                            </li>
                            );
                    })}
                </ul>
                <ul class="bracket bracket-4">
                    <li class="team-item">{songs[14]}</li>
                </ul>
            </div>
            {round === 4 ? winnerMessage : submitButton}
        </div>
    )

    if(submitted){
        let tallyList = [];
        let reducedSongs = [];
        for(var i = start; i < end; i++){
            tallyList.push(0);
            reducedSongs.push(songs[i])
        }
        return(
            <div>
                <Submit artist={artist} votes={votesList} songs={songs} round={round} tallyList={tallyList} start={start} end={end} reducedSongs={reducedSongs}/>
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