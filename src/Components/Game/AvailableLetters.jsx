import React, { PureComponent } from 'react';

export class AvailableLetters extends PureComponent {
    render() {
        return(
            <div className="game-panel">
                <h3>Available letters:</h3>
                <p className="game-letters">{this.props.getAvailableLetters()}</p>
            </div>
        );
    }
}