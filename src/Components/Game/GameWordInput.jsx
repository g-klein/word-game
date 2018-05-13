import React, { PureComponent } from 'react';

export class GameWordInput extends PureComponent {
    render() {
        const submitDisabled = !(this.props.gameWord && this.props.gameWord.valid) 
                                || (this.props.gameWord && this.props.gameWord.submitting);
        const inputClass = (this.props.gameWord && this.props.gameWord.valid) ? "" : "invalid";
        console.log("Is not rerendering?");
        return(
            <form onSubmit={this.props.handleSubmit}>
                <input
                    type="text"
                    placeholder="Type your word here..."
                    value={(this.props.gameWord && this.props.gameWord.value) || ""}
                    onChange={this.props.handleChange}
                    className={inputClass} />
                <button type="submit" disabled={submitDisabled}>Submit</button>
            </form>
        );
    }
}