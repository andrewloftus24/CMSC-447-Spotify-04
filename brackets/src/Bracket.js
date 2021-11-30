import React, {useState, useEffect} from "react";
import SingleElimination from './Components/SingleElim';

function Bracket() {
    const [generate, setGenerated] = useState(false);
    const [songs, setSongs] = useState([]);
    const [artist, setArtist] = useState("");

    useEffect(() => {
        GrabSongs();
    }, [artist]);

    function GrabSongs() {
        fetch('http://127.0.0.1:8000/api/toptracks/?' + new URLSearchParams({
            artist: artist,
            num: 8,
        }))
        .then(response => response.json())
        .then(data => setSongs(data));
    }

    let dropdown_menu = (
        <div class="container">
            <div class="row">
                <div class="col p-2 border border-secondary">
                    <select class="form-control">
                        <option disabled selected hidden>Choose Bracket Type</option>
                        <option>Single Elimination</option>
                        <option>Double Elimination</option>
                        <option>Round Robin</option>
                        <option>Multi-Stage</option>
                    </select>
                </div>
                <div class="col p-2 border border-secondary" align="center">
                    <input type="text" class="form-control" placeholder="Enter Artist Name" aria-label="Enter Artist Name" aria-describedby="basic-addon2" id="artistName" />
                </div>
                <div class="col p-2 border border-secondary" align="center">
                    <button type="button" class="btn btn-primary" onClick={() => setArtist(document.getElementById('artistName').value)}>
                        Generate
                    </button>
                </div>
            </div>
        </div>
    );

  return (
    <div>
        <h1 class="h1 text-center">Generating the Bracket</h1>
        <br/>
         {dropdown_menu}
        <br/>
        <SingleElimination artist={artist}/>
        <br/>
    </div>
  );
}

export default Bracket;
