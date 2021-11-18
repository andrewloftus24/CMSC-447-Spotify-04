import React from "react";

function Bracket() {
  return (
    <div>
        <h1 class="h1 text-center">Generating the Bracket</h1>
        <br/>
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
                    <p>Bracket Source(Playlist Link or Keywords)</p>
                </div>
                <div class="col p-2 border border-secondary" align="center">
                    <button type="button" class="btn btn-primary">
                        Generate
                    </button>
                </div>
            </div>
        </div>
        <br/>
        <h3 class="h3 text-center">Single Elimination, Stage One</h3>
        <h5 class="h5 text-center">Pick your favorites, then click SUBMIT</h5>
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-sm-2" />
                <div class="col-sm-3 p-2 border border-secondary">
                    <button type="button" class="btn btn-primary-outline">
                        Song 1
                    </button>
                </div>
                <div class="col-sm-2" />
                <div class="col-sm-3 p-2 border border-secondary">
                    <button type="button" class="btn btn-primary-outline">
                        Song 3
                    </button>
                </div>
                <div class="col-sm-2" />
            </div>
            <div class="row justify-content-md-center">
                <div class="col-sm-2" />
                <div class="col-sm-3 p-2 border border-secondary">
                    <button type="button" class="btn btn-primary-outline">
                        Song 2
                    </button>
                </div>
                <div class="col-sm-2" />
                <div class="col-sm-3 p-2 border border-secondary">
                    <button type="button" class="btn btn-primary-outline">
                        Song 4
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
                        Song 5
                    </button>
                </div>
                <div class="col-sm-2" />
                <div class="col-sm-3 p-2 border border-secondary">
                    <button type="button" class="btn btn-primary-outline">
                        Song 7
                    </button>
                </div>
                <div class="col-sm-2" />
            </div>
            <div class="row">
                <div class="col-sm-2" />
                <div class="col-sm-3 p-2 border border-secondary">
                    <button type="button" class="btn btn-primary-outline">
                        Song 6
                    </button>
                </div>
                <div class="col-sm-2" />
                <div class="col-sm-3 p-2 border border-secondary">
                    <button type="button" class="btn btn-primary-outline">
                        Song 8
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
        <br/>
    </div>
  );
}

export default Bracket;
