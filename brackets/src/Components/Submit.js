import React, { useState, useEffect } from 'react';
import GetCookie from './GetCookie';

function Submit(props){
    const [voteData, setVoteData] = useState({});
    const [loaded, setLoaded] = false;
    let csrftoken = GetCookie('csrftoken');

    useEffect(() => {
        UploadVotes();
        setLoaded(true);
    }, [])

    async function UploadVotes(){
        let userData;
        const requestOptions = {
            method: 'POST',
            headers: {"Content-type" : "application/json", 'X-CSRFToken': csrftoken},
            body: JSON.stringify({
                songs: props.songs,
                votes: props.votes
            }),
        };
        const response = await fetch('/api/updatevotes/', requestOptions);
        const data = await response.json();

        setVoteData({name: data.user, winners: data.winners});
    }

    window.console.log(voteData.name + "\n" + voteData.winners);

    let submitScreen = (
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-12">
                    <h3 class="h3 text-center">Tallying Results From Single Elimination Stage One</h3>
                </div>
            </div>
            <div class="row justify-content-md-center">
            {voteData.map((person) => {
                return(
                    <div class="col-md-3">
                        <h6 class="h6 text-center">{person.name}</h6>
                    </div>
                )
            })}
            </div>
        </div>
    )
    return (
        <div>
            {loaded ? submitScreen : ""}
        </div>
    )
}

export default Submit;
