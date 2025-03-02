const initState = {
    manufacturers: [],
    isLoaded: false,
};

const ManufacturerReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOAD_MANUFACTURERS":
            return { ...state, manufacturers: action.payload, isLoaded: true };
        default:
            return state;
    }
};

export default ManufacturerReducer;
