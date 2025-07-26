import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import rootReducer from './reducers'

const getThunkMiddleware = () => {
    try {
        return require('redux-thunk').default
    } catch (e) {
        console.error('Error loading redux-thunk:', e)
        return ({ dispatch, getState }) =>
            (next) =>
            (action) => {
                if (typeof action === 'function') {
                    return action(dispatch, getState)
                }
                return next(action)
            }
    }
}

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(getThunkMiddleware()))
)

export default store
