import { combineReducers } from 'redux';
import generateTestReducer from '../features/generateTest/redux/reducer';
import calibrationReducer from '../features/calibrateTest/calibrateRedux/reducer';

export default combineReducers({ generateTest: generateTestReducer, calibrateTest: calibrationReducer })