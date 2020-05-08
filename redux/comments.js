import * as ActionTypes from './ActionTypes';

const initialState = {
    errMess: null,
    comments: []
};

export const comments = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {
                ...state,
                errMess: null,
                comments: action.payload
            };
        case ActionTypes.COMMENTS_FAILED:
            return {
                ...state,
                errMess: action.payload,
                comments: []
            };
        case ActionTypes.ADD_COMMENT:
            return {
                ...state,
                errMess: null,
                comments: [
                    ...state.comments,
                    {...action.payload, id: state.comments.length}
                ]
            }
        default:
            return state;
    }
};
