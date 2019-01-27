const initialState = {
    user: {},
    username: '',
    areas: [],
    inbox: [],
    today: [],
    upcoming: [],
    someday: [],
    logbook: [],
    sections: [],
    editTitle: '',
    editTag: '',
    editNotes: ''
}

const GET_USER_DATA = 'GET_USER_DATA';
const GET_INBOX = 'GET_INBOX';
const GET_TODAY = 'GET_TODAY';
const GET_UPCOMING = 'GET_UPCOMING';
const GET_SOMEDAY = 'GET_SOMEDAY';
const GET_LOGBOOK = 'GET_LOGBOOK';

const GET_TABS_TASKS = 'GET_TABS_TASKS'


export function getUserData(userInfo) {
    return {
        type: GET_USER_DATA,
        payload: userInfo
    }
}

export function getInbox(inbox) {
    return {
        type: GET_INBOX,
        payload: inbox
    }
}

export function getToday(today) {
    return {
        type: GET_TODAY,
        payload: today
    }
}

export function getUpcoming(upcoming) {
    return {
        type: GET_UPCOMING,
        payload: upcoming
    }
}

export function getSomeday(someday) {
    return {
        type: GET_SOMEDAY,
        payload: someday
    }
}

export function getLogbook(logbook) {
    return {
        type: GET_LOGBOOK,
        payload: logbook
    }
}

export function getTabsTasks(sections) {
    return {
        type: GET_TABS_TASKS,
        payload: sections
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA:
            return {...state, user: action.payload}
        case GET_INBOX:
            return {...state, inbox: action.payload}
        case GET_TODAY:
            return {...state, today: action.payload}
        case GET_UPCOMING:
            return {...state, upcoming: action.payload}
        case GET_SOMEDAY:
            return {...state, someday: action.payload}
        case GET_LOGBOOK:
            return {...state, logbook: action.payload}
        case GET_TABS_TASKS:
            return {...state, sections: action.payload}
        default:
            return state
    }
}