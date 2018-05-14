import React, { PureComponent } from 'react';
import { GAME_STATES } from '../../Constants/GameStates';

export class GameWordInput extends PureComponent {
    render() {
        const submitDisabled = !(this.props.gameWord && this.props.gameWord.valid) 
                                || (this.props.gameWord && this.props.gameWord.submitting)
                                || (this.props.gameState && this.props.gameState !== GAME_STATES.STARTED);
        const inputDisabled = (this.props.gameState && this.props.gameState !== GAME_STATES.STARTED);

        const inputClass = (this.props.gameWord && this.props.gameWord.valid) ? "" : "invalid";
        return(
            <div className="game-panel">
                <form onSubmit={this.props.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Type your word here..."
                        value={(this.props.gameWord && this.props.gameWord.value) || ""}
                        onChange={this.props.handleChange}
                        className={inputClass}
                        disabled={inputDisabled} />
                    <button type="submit" disabled={submitDisabled}>Submit</button>
                </form>
            </div>
        );
    }
}