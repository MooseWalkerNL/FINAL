const initialState = {
    loading: false,
    trucks: [],
    error: null,
}

export default function trucksReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_TRUCKS_REQUEST:
            return { ...state, loading: true, error: null }
        case FETCH_TRUCKS_SUCCESS:
            return { ...state, loading: false, trucks: action.payload }
        case FETCH_TRUCKS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}
