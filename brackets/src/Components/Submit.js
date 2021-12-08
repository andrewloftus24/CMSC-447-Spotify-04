import React, { useState, useEffect } from 'react';
import GetCookie from './GetCookie';

function Submit(props){
    const [voteData, setVoteData] = useState([]);
    let csrftoken = GetCookie('csrftoken');

    useEffect(() => {
        UploadVotes();
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
        userData = [...voteData];
        userData.push({name: data.user, winners: data.winners});
        window.console.log(userData);

        setVoteData(userData);
    }

    let submitScreen = (
        <div>
            <h3 class="h3 text-center">Tallying Results From Single Elimination Stage One</h3>
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
            {voteData.map((user) => {
                return(
                    <tr>
                        <th scope="row">{user.name}</th>
                        {user.winners.map((song) => {
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

    return (
        <div>
            {submitScreen}
        </div>
    )
}

export default Submit;
