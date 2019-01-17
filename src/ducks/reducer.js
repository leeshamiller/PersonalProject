const initialState = {
    user: {},
    username: '',
    areas: [],
    projects: [
        {
        user_id: 0,
        title: '',
        area_id: 0
        }

    ]
}

const GET_USER_DATA = 'GET_USER_DATA';
const GET_AREAS = 'GET_AREAS';
const GET_PROJECTS = 'GET_PROJECTS';
const CREATE_AREA = 'CREATE_AREA';

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

export function getProjects(projects) {
    return {
        type: GET_PROJECTS,
        payload: projects
    }
}

export function createArea(user_id, title, area_id) {
    return {
        type: CREATE_AREA,
        payload: {
            user_id,
            title,
            area_id
        }
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA:
            return {...state, user: action.payload}
        case GET_AREAS:
            return {...state, areas: action.payload}
        case GET_PROJECTS:
            return {...state, projects: action.payload}
        case CREATE_AREA:
            return {...state, user_id: action.payload.user_id, title: action.payload.title, area_id: action.payload.area_id}
        default:
            return state
    }
}