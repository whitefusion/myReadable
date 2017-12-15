import {
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    RECEIVE_POST
} from '../actions'

import {generateId,generateCommentId} from '../utils/utility'

import * as api from '../utils/utility'

export default function post (state={},action){
    console.log(action.type)
    switch(action.type){
        case ADD_POST:
            console.log(action.post)
            return {...state,
                    [action.post.id]:action.post
                }
        case EDIT_POST:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    body:action.body,
                    title: action.title
                }
            }
        case DELETE_POST:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    deleted:true
                }
            }
        case RECEIVE_POST:
            const reloaded= {}
            action.posts.forEach((p) => reloaded[p.id]=p)
            return reloaded
        default:
            return state
    }
}