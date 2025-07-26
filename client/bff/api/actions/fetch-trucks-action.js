export const fetchTrucksRequest = () => ({
    type: 'FETCH_TRUCKS_REQUEST',
})

export const fetchTrucksSuccess = (trucks) => ({
    type: 'FETCH_TRUCKS_SUCCESS',
    payload: trucks,
})

export const fetchTrucksFailure = (error) => ({
    type: 'FETCH_TRUCKS_FAILURE',
    payload: error,
})
