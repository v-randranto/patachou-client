import {
    process
} from "../constants/actionTypes"
const {
    FAILURE,
    REINIT,
    SUCCESS
} = process;
const processReducer = (state, action) => {
    switch (action.type) {
        case FAILURE:
            return {
                isLoading: false,
                    isSuccessful: false,
                    hasFailed: true,
                    errorCode: action.errorCode
            };
        case REINIT:
            return {
                isLoading: true,
                    isSuccessful: false,
                    hasFailed: false,
                    errorCode: null
            };
        case SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccessful: true,
                emailHasFailed: action.emailHasFailed
            };
        default:
            return state;
    }
}

export default processReducer;