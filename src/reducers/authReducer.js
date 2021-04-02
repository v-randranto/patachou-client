import {
    connection
} from "../constants/actionTypes"
import {
    FixLater
} from "../models/types"
const {
    LOGIN,
    LOGOUT
} = connection

const authReducer = (state: FixLater, action: FixLater): FixLater => {
    const {user} = action
    switch (action.type) {
        case LOGIN:
            return {
                isAuthenticated: true, user
            }
            case LOGOUT:
                return {
                    isAuthenticated: false, user: null
                }
    }
}

export default authReducer;