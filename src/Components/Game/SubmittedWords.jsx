import React, { PureComponent } from 'react';

export class SubmittedWords extends PureComponent {
    constructor(){
        super();
        this.getWordsList = this.getWordsList.bind(this);
    }

    getWordsList(){
        const wordKeys = (this.props.gameWords && Object.keys(this.props.gameWords)) || [];

        return wordKeys.map((key, idx) => {
            return <li key={key}>{this.props.gameWords[key]}</li>;
        })
    }

    render() {
        return (
            <div className="game-panel">
                <h3>Submitted words:</h3>
                <ul className="word-list">{this.getWordsList()}</ul>
            </div>
        );
    }
}