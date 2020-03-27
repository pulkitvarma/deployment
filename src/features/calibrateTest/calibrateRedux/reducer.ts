import * as calibrationTypes from './types';

const initialState = {
    testType: 'gat',
    emails: [],
    error: true
}

interface IAction {
    type: string,
    payload: string
}

const calibrationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case calibrationTypes.SET_CALIBRATION_TEST_TYPE:
            return {
                ...state,
                testType: action.payload
            }
        case calibrationTypes.SET_EMAIL:
            let email;
            if (state.emails && action.payload.email !== '') {
                email = state.emails
                email.splice(action.payload.index, 1);
                email.splice(action.payload.index, 0, action.payload.email)
            }
            else {
                email = state.emails ? state.emails : [];
                email.push(action.payload.email)
            }
            return {
                ...state,
                emails: email
            }
        case calibrationTypes.REMOVE_EMAIL:
            let emails = state.emails;
            emails.splice(action.payload, 1);
            emails.splice(action.payload, 0, '');
            return {
                ...state,
                emails: emails
            }
        case "DELETE":
            let enteredEmails = state.emails;
            enteredEmails.splice(action.payload - 1, 1);
            return {
                ...state,
                emails: enteredEmails
            }
        default: return {
            state
        }
    }
}

export default calibrationReducer;