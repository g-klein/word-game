import React, { PureComponent } from 'react';
import { Row, Col } from "react-bootstrap";

export class PlayerInfo extends PureComponent {
    constructor(){
        super();
        this.getPlayersBlock = this.getPlayersBlock.bind(this);
    }

    getPlayersBlock() {
        const playerKeys = this.props.players && Object.keys(this.props.players);
        const players = this.props.players;

        var playersList = playerKeys && playerKeys.map((p) => {
            const player = players[p];
            const isMe = p === this.props.myPlayerId;
            const copy = `${player.name} ${player.host ? " (host)" : ""}`;
            const itemClass = isMe ? "me" : "";

            return <li className={itemClass} key={p}>{copy}</li>;
        });
        
        return <ul>{playersList}</ul>;
    }

    render() {
        return (            
            <div className="game-panel player-info">
                <h3>Players</h3>
                <Row>
                    <Col xs={12}>
                        {this.getPlayersBlock()}
                    </Col>
                    {this.props.isHost &&
                    <Col xs={12}>
                        <button className="start-button" onClick={() => {this.props.startGame(this.props.gameId)}}>
                            Start game
                        </button>
                    </Col>
                    }
                </Row>
            </div>
        );
    }
}