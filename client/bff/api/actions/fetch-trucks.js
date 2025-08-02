export const FETCH_TRUCKS_REQUEST = 'FETCH_TRUCKS_REQUEST'
export const FETCH_TRUCKS_SUCCESS = 'FETCH_TRUCKS_SUCCESS'
export const FETCH_TRUCKS_FAILURE = 'FETCH_TRUCKS_FAILURE'

const API_URL = import.meta.env.VITE_API_URL

export const fetchTrucks = () => async (dispatch) => {
    dispatch({ type: FETCH_TRUCKS_REQUEST })

    try {
        const response = await fetch(`${API_URL}/api/trucks`)

        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.statusText}`)
        }

        const data = await response.json()
        dispatch({ type: FETCH_TRUCKS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: FETCH_TRUCKS_FAILURE, payload: error.message })
    }
}
