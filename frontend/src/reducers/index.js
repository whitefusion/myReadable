import {
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,
    DELETE_PARENT
} from '../actions'

import {generateId,generateCommentId} from '../utils/utility'
import {combineReducers} from 'redux'

function post (state={},action){
    switch(action.type){
        case ADD_POST:
            const {author,body,title,category} = action
            return {...state,
                {
                    author,body,title,category,
                    timestamp: Date.now(),
                    id: generateId()
                }
            }
        case EDIT_POST:
            const {id,body} = action
            return {
                ...state,
                [id]: {
                    ...state[id],
                    [body]:body
                }
            }
        case DELETE_POST:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    [deleted]:true
                }
            }
        default:
            return state
    }
}

function comment (state={},action){
    switch(action.type){
        case ADD_COMMENT:
            const {author,body,parentId} = action
            return {
                author,body,parentId,
                id: generateCommentId(),
                timestamp: Date.now()
            }
        case EDIT_COMMENT:
            const {body, id} = action
            return {
                ...state,
                [id]: {
                    ...state[id],
                    body
                }
            }
        case DELETE_COMMENT:
            return {
                ...state,
                [action.id]:{
                    ...state[id],
                    [deleted]:true
                }
            }
        case DELETE_PARENT:
            let temp_state = {...state}
            Object.keys(temp_state).forEach(k=>{
                if(temp_state[k].parentId === action.parentId)
                    temp_state[k].parentDeleted = true
            })
            return temp_state
        default:
            return state
    }
}

export default combineReducers({post,comment})