
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export class GameOverBox extends PureComponent {
    render() {
        const iAmWinner = this.props.winner && this.props.winner.id === this.props.myPlayerId;
        const copy = iAmWinner ? "You" : this.props.winner && this.props.winner.name;
        console.log(this.props.winner);
        console.log(this.props.myPlayerId);
        
        return(
        <div id="game-over-box">
            <div className="game-panel">
                <h3>The winner is...</h3>
                <div>{copy}!!</div>
                <div><Link to={"/"}>Home</Link></div>
            </div>
        </div>
        );
    }
}