import React, { Component } from 'react';
import moment from 'moment';

export class CountdownTimer extends Component {
    constructor(){
        super();
        this.recalculateSecondsRemaining = this.recalculateSecondsRemaining.bind(this);
    }

    componentDidMount(){
        this.recalculateSecondsRemaining();
        const interval = setInterval(this.recalculateSecondsRemaining, 100);
        this.setState({interval});
    }

    componentWillUnmount(){
        const interval = this.state.interval;
        clearInterval(interval);
    }

    recalculateSecondsRemaining(){
        const endTime = this.props.gameEndTime;
        let secondsRemaining = moment.utc(endTime).diff(moment.utc(), 'seconds');
        secondsRemaining = Math.max(secondsRemaining, 0);
        this.setState({ secondsRemaining});
    }

    render() {
        return(
            <div className="game-panel">Time remaining: {this.state && this.state.secondsRemaining}</div>
        );
    }
}