import { EVALUATE_SCORE } from './types';

export const evaluateScore = (data) => {
    return {
        type: EVALUATE_SCORE,
        payload: data,
    };
};
