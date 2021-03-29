import {
    connection
} from "../constants/actionTypes"
import {FixLater} from "../models/types"
const {
    LOGIN,
    LOGOUT
} = connection

const authReducer = (state: FixLater, action: FixLater): FixLater => {
    switch (action.type) {
case LOGIN:
    return { isAUthenticated: true, user: action.user}
    case LOGOUT: 
    return {isAuthenticated: false, user:null}
}}

export default authReducer;