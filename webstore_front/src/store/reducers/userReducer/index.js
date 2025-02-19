const initState = {
    data: { users: [] },
    roles: []
}

const UserReducer = (state = initState, action) => {
    switch(action.type) {
        case "LOAD_USERS":
            return { ...state, data: action.payload };
        case "LOAD_ROLES":
            return { ...state, roles: action.payload };
        case "DELETE_ROLE":
            return { ...state, roles: state.roles.filter(r => r.id != action.payload) };
        default: return state;
    }
}

export default UserReducer;