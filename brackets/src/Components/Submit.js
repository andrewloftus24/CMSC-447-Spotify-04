import React, { useState, useEffect } from 'react';
import GetCookie from './GetCookie';

function Submit(props){
    const [voteData, setVoteData] = useState([]);
    const [tallys, setTallys] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    let csrftoken = GetCookie('csrftoken');

    useEffect(() => {
        UploadVotes();
    }, [])

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
                code: props.joinCode,
                songs: props.songs,
                votes: props.votes
            }),
        };

        const response = await fetch('/api/updatevotes/', requestOptions);
        const data = await response.text();
    }

    async function GrabVotes(){
        const response = await fetch('/api/getvotes/');
        const data = await response.json();
        let userData = [];
        let updateTallys = [...tallys];
        for(var i = 0; i < Object.keys(data.data).length; i++){
            userData.push(data.data[i]);
            for(var j = 0; j < 8; j++){
                updateTallys[j] += data.data[i].votes[j];
            }
        }
        setVoteData(userData);
        setTallys(updateTallys);
    }


    let submitScreen = (
        <div>
            <h3 class="h3 text-center">Tallying Results From Single Elimination Stage One</h3>
            <br />
            <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Song 1</th>
                    <th scope="col">Song 2</th>
                    <th scope="col">Song 3</th>
                    <th scope="col">Song 4</th>
                </tr>
            </thead>
            <tbody>
            {voteData.map((data, index) => {
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
//hi
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
            {props.songs.map((name, index) => {
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

    return (
        <div>
            {submitScreen}
            <br/>
            <br/>
            <br/>
            <br/>
            {totalVotes}
        </div>
    )
}

export default Submit;
