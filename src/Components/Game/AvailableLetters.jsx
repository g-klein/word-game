import React, { PureComponent } from 'react';

export class AvailableLetters extends PureComponent {
    constructor(){
        super();
        this.getAvailableLetters = this.getAvailableLetters.bind(this);
    }    

    getAvailableLetters(){
        return this.props.gameLetters && this.props.gameLetters.join(" ");
    }

    render() {
        return(
            <div className="game-panel">
                <h3>Available letters:</h3>
                <p className="game-letters">{this.getAvailableLetters()}</p>
            </div>
        );
    }
}