const initialState = {
    isOpen: false,
    content: 'Hello world!'
};

export function toastReducer(state = initialState, action) {
    switch (action.type) {
        case 'TOAST_UPDATE': {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}