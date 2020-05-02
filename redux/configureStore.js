import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import {dishes} from './dishes';
import {comments} from './comments';
import {leaders} from './leaders';
import {promotions} from './promotions';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes,
            comments,
            leaders,
            promotions,
        }),
        applyMiddleware(thunkMiddleware, logger)
    );

    return store;
};
