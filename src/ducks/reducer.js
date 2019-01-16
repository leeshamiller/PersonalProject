const initialState = {
    user: {},
    username: '',
    areas: []
}

const GET_USER_DATA = 'GET_USER_DATA';
const GET_AREAS = 'GET_AREAS';

export function getUserData(userInfo) {
    return {
        type: GET_USER_DATA,
        payload: userInfo
    }
}

export function getAreas(areas) {
    return {
        type: GET_AREAS,
        payload: areas
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA:
            return {...state, user: action.payload}
        case GET_AREAS:
            return {...state, areas: action.payload}
        default:
            return state
    }
}