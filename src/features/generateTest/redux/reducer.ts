import * as actionTypes from "./types";
let z = new Date();
z.setDate(z.getDate() + 1);
z.setHours(9, 0, 0);

const initialState = {
  testDetails: {
    testDateTime: { value: z, error: "" },
    testExpiry: { value: 3, error: "" },
    tags: [],
    difficulty: ""
  },
  testType: "gat",
  validEmails: [],
  invalidEmails: [],
  comp: "",
  rawEmails: {
    value: "",
    error: "",
    disabled: false,
    buttonText: "Validate Email id’s  >"
  },
  redundantEmails: { open: false, emails: [] },
  generateError: false
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_TEST_DETAILS_DATA:
      let options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      };
      return {
        ...state,
        testDetails: action.payload
      };
    case actionTypes.SET_VALID_EMAILS:
      return {
        ...state,
        validEmails: action.payload
      };
    case actionTypes.SET_INVALID_EMAILS:
      return {
        ...state,
        invalidEmails: action.payload
      };
    case actionTypes.COMP_TO_BE_DISPLAYED:
      return {
        ...state,
        comp: action.payload
      };
    case actionTypes.SET_RAW_EMAILS:
      return {
        ...state,
        rawEmails: action.payload
      };
    case actionTypes.SET_TEST_TYPE: {
      return {
        ...state,
        testType: action.payload,
        completedSteps: [1]
      };
    }
    case actionTypes.SET_REDUNDANT_EMAIL: {
      return {
        ...state,
        redundantEmails: action.payload
      };
    }
    case actionTypes.SET_ERROR: {
      return {
        ...state,
        generateError: action.payload
      };
    }
    default:
      return state;
  }
};
export default reducer;
