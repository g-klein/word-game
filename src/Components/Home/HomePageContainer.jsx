import { HomePage } from './';
import { connect } from 'react-redux';

export const HomePageContainer = connect((state) => {
    return {
        gameState: state.GameReducer
    }    
})(HomePage);
