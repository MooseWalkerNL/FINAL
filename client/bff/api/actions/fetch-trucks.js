export const FETCH_TRUCKS_REQUEST = 'FETCH_TRUCKS_REQUEST'
export const FETCH_TRUCKS_SUCCESS = 'FETCH_TRUCKS_SUCCESS'
export const FETCH_TRUCKS_FAILURE = 'FETCH_TRUCKS_FAILURE'

export const fetchTrucks = () => async (dispatch) => {
    dispatch({ type: FETCH_TRUCKS_REQUEST })

    try {
        const response = await fetch('http://localhost:5000/api/trucks')

        const data = await response.json()
        dispatch({ type: FETCH_TRUCKS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: FETCH_TRUCKS_FAILURE, payload: error.message })
    }
}
