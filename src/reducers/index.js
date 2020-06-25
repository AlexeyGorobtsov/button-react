import {combineReducers} from 'redux';

import { appReducer } from './appReducer';
import {toastReducer } from '../container/info-components/toast/reducer';

export const reducer = combineReducers({
    app: appReducer,
    toast: toastReducer,
});