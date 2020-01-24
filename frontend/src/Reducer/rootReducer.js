const initState = {
    user: [],
    error: false,
    fireRedirect: false
}

const rootReducer = (state = initState, action) => {
    

    if (action.type === 'USER_AUTH'){
        console.log(action.user)
        return {
            ...state,
            user: action.user,
            fireRedirect: true
        }
    }
    else if (action.type === 'AUTH_ERROR'){
        return {
            ...state,
            error: true
        }
    }
    else return state;  
}

export const getUser = state => state.user;
export const getAuthError = state => state.error;
export const getAuthRedirection = state => state.fireRedirect;

export default rootReducer