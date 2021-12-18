import React, { useState, useEffect } from 'react';
import GetCookie from './GetCookie';
import SingleElimination from './SingleElim';

function Submit(props){
    const [voteData, setVoteData] = useState([]);
    const [tallys, setTallys] = useState(props.tallyList);
    const [nextStage, setNextStage] = useState(false);
    const [songs, setSongs] = useState(props.reducedSongs);
    const [songwinners, setWinners] = useState([]);
    const [songDisplay, setDisplay] = useState([]);
    let csrftoken = GetCookie('csrftoken');

    useEffect(() => {
        UploadVotes();
    }, [])

    useEffect(() => {
        window.console.log("hello");
    }, [nextStage])

    useEffect(() => {
        const interval = setInterval(() => {
            GrabVotes();
        }, 4000);
        return () => clearInterval(interval);
    }, [])

    async function UploadVotes(){
        const requestOptions = {
            method: 'POST',
            headers: {"Content-type" : "application/json", 'X-CSRFToken': csrftoken},
            body: JSON.stringify({
                songs: songs,
                votes: props.votes
            }),
        };

        const response = await fetch('/api/updatevotes/', requestOptions);
        const data = await response.json();
    }

    async function GrabVotes(){
        const response = await fetch('/api/getvotes/?' + new URLSearchParams({
            num: tallys.length
        }));

        const data = await response.json();
        let userData = [];
        let updateTallys = [...tallys];
        let displayNames = [];
        for(var i = 0; i < Object.keys(data.data).length; i++){
            userData.push(data.data[i]);
            for(var j = 0; j < tallys.length; j++){
                updateTallys[j] += data.data[i].votes[j];
                if(j < (tallys.length / 2)){
                    let textDisplay = "Song " + String(j+1);
                    displayNames.push(textDisplay);
                }
            }
        }
        setVoteData(userData);
        setTallys(updateTallys);
        setDisplay(displayNames);
    }

    const handleContinue = () => {
        let winners = [];
        let updatedSongs = [...props.songs];
        let winner = 0;
        for(var i = 0; i < tallys.length; i++){
            if(i % 2 != 0){
                if(tallys[i] > winner){
                    winners.push(songs[i]);
                }
                else{
                    winners.push(songs[i-1]);
                }
            }
            winner = tallys[i];
        }
        for(var i = 0; i < songs.length/2; i++){
            updatedSongs[i+props.end] = winners[i];
        }
        window.console.log("updated list: " + updatedSongs);
        setWinners(updatedSongs);
        setNextStage(true);
    }

    let submitScreen = (
        <div>
            <h3 class="h3 text-center">Tallying Results From Single Elimination Stage One</h3>
            <br />
            <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    {songDisplay.map((name) => {
                                return(
                                    <th scope="col">
                                        {name}
                                    </th>
                                );
                    })}
                </tr>
            </thead>
            <tbody>
            {voteData.map((data) => {
                return(
                    <tr>
                        <th scope="row">{data.user}</th>
                        {data.winners.map((song) => {
                            return(
                                <td>{song}</td>
                            );
                        })}
                    </tr>
                );
            })}
            </tbody>
            </table>
        </div>
    )

    let totalVotes = (
        <div>
            <h3 class="h3 text-center">Scoreboard</h3>
            <br />
            <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="col">Song</th>
                    <th scope="col">Votes</th>
                </tr>
            </thead>
            <tbody>
            {songs.map((name, index) => {
                return(
                    <tr>
                        <th scope="col">{name}</th>
                        <td scope="col">{tallys[index]}</td>
                    </tr>
                );
            })}
            </tbody>
            </table>
        </div>
    )


    if(nextStage){
        return (
            <div>
                <SingleElimination artist={props.artist} songs={songwinners} round={props.round+1}/>
            </div>
        )
    }

    return (
        <div>
            {submitScreen}
            <br/>
            <br/>
            <br/>
            <br/>
            {totalVotes}
            <br/>
            <button type="button" class ="btn btn-primary" onClick={() => handleContinue()}>
                Continue
            </button>
        </div>
    )
}

export default Submit;
