import React, { PureComponent } from 'react';

export class GameHeader extends PureComponent {
    constructor(){
        super();
        this.onShareClick = this.onShareClick.bind(this);
    }

    onShareClick(e) {
        e.preventDefault();
        const el = document.createElement('textarea');
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    render() {
        return (
            <div className="game-panel game-header">
                <p>Welcome to the word game!</p>
                <p className="join-link">Join link: <a id="share-link-tag" href="" onClick={this.onShareClick}>{window.location.href} <i className="fa fa-clipboard" /></a></p>
            </div>
        )
    }
}