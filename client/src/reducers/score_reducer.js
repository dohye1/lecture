import { EVALUATE_SCORE_RESULT } from '../actions/types';

const scoreReducer = (state = {}, action) => {
    switch (action.type) {
        case EVALUATE_SCORE_RESULT:
            return {
                evaluateResult: action.payload.evaluateResult,
                scoreInfo: action.payload.scoreInfo,
            };
        default:
            return state;
    }
};

export default scoreReducer;
