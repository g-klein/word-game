import { HomePage } from './';
import { connect } from 'react-redux';
import * as actions from '../../Actions';

export const HomePageContainer = connect((state) => {
    return {
        gameState: state.gameReducer
    }    
}, actions)(HomePage);
