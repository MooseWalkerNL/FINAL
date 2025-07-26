import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
} from '../bff/api/actions/cart-actions'

const initialState = {
    items: [],
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            if (state.items.some((item) => item.id === action.payload)) {
                return state
            }
            return {
                ...state,
                items: [...state.items, { id: action.payload }],
            }

        case REMOVE_FROM_CART:
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload),
            }

        case CLEAR_CART:
            return {
                ...state,
                items: [],
            }

        default:
            return state
    }
}
