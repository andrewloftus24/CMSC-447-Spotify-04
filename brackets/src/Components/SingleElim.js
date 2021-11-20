import React, { useState, useEffect } from 'react';

function SingleElimination(props){
    const artist = props.artist;
    const [songs, setSongs] = useState([]);

    GrabSongs();

    function GrabSongs() {
        fetch('http://127.0.0.1:8000/api/toptracks/?' + new URLSearchParams({
            artist: artist,
            num: 8,
        }))
        .then(response => response.json())
        .then(data => setSongs(data));
    }

    return(
        <div>
            <h3 class="h3 text-center">Single Elimination, Stage One</h3>
            <h5 class="h5 text-center">Pick your favorites, then click SUBMIT</h5>
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-sm-2" />
                    <div class="col-sm-3 p-2 border border-secondary">
                        <button type="button" class="btn btn-primary-outline">
                            {songs[0]}
                        </button>
                    </div>
                    <div class="col-sm-2" />
                    <div class="col-sm-3 p-2 border border-secondary">
                        <button type="button" class="btn btn-primary-outline">
                            {songs[2]}
                        </button>
                    </div>
                    <div class="col-sm-2" />
                </div>
                <div class="row justify-content-md-center">
                    <div class="col-sm-2" />
                    <div class="col-sm-3 p-2 border border-secondary">
                        <button type="button" class="btn btn-primary-outline">
                            {songs[1]}
                        </button>
                    </div>
                    <div class="col-sm-2" />
                    <div class="col-sm-3 p-2 border border-secondary">
                        <button type="button" class="btn btn-primary-outline">
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
                    <div class="col-sm-3 p-2 border border-secondary">
                        <button type="button" class="btn btn-primary-outline">
                            {songs[4]}
                        </button>
                    </div>
                    <div class="col-sm-2" />
                    <div class="col-sm-3 p-2 border border-secondary">
                        <button type="button" class="btn btn-primary-outline">
                            {songs[6]}
                        </button>
                    </div>
                    <div class="col-sm-2" />
                </div>
                <div class="row">
                    <div class="col-sm-2" />
                    <div class="col-sm-3 p-2 border border-secondary">
                        <button type="button" class="btn btn-primary-outline">
                            {songs[5]}
                        </button>
                    </div>
                    <div class="col-sm-2" />
                    <div class="col-sm-3 p-2 border border-secondary">
                        <button type="button" class="btn btn-primary-outline">
                            {songs[7]}
                        </button>
                    </div>
                    <div class="col-sm-2" />
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <p>      </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12" align="right">
                        <button type="button" class="btn btn-primary">
                            SUBMIT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleElimination;