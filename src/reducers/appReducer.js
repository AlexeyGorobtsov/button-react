const initialState = {
    toasts: {
        isOpen: false,
        content: 'Hello world!'
    }
};

export function appReducer(state=  initialState, action) {
    switch (action.type) {
        case 'APP_UPDATE': {
            return {
                ...state,
                ...action.payload
            }
        }
        default: return state
    }
}