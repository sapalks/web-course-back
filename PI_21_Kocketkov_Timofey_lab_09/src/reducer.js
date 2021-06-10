export default (state, action) => {
    switch (action.type) {
        case "IS_AUTH":
            return {
                ...state,
                isAuth: true,
                userName: action.payload.userName,
                roomId: action.payload.roomId
            };
        case "SET_USERS":
            return {
                ...state,
                isAuth: true,
                users: action.payload,

            };
        case "NEW_MESSAGE":
            return {
                ...state,
                messages: [...state.messages, action.payload],

            };
        default:
            return state;
    }
}