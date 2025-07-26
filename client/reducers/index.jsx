import { combineReducers } from 'redux'
import trucksReducer from './trucks-reducer'
import { cartReducer } from './cart-reducer'

const rootReducer = combineReducers({
    trucks: trucksReducer,
    cart: cartReducer,
})

export default rootReducer
