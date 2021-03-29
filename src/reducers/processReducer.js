import {
    process
} from "../constants/actionTypes"
import {
    FixLater
} from "../models/types"
const {
    FAILURE,
    REINIT,
    SUCCESS
} = process;
const processReducer = (state: fixLater, action: FixLater): FixLater => {
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
                    isSuccessful: true
            };
        default:
            return state;
    }
}

export default processReducer;