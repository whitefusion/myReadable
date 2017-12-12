import {
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    RECEIVE_POST
} from '../actions'

import {generateId,generateCommentId} from '../utils/utility'

export default function post (state={},action){
    console.log(action.type)
    switch(action.type){
        case ADD_POST:
            const id = generateId()
            const {author,body,title,category} = action
            return {...state,
                [id] : {author,body,title,category,
                    timestamp: Date.now(),id
                }
            }
        case EDIT_POST:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    [action.body]:body
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
            console.log('received ! ')
            const reloaded= {}
            action.posts.forEach((p) => reloaded[p.id]=p)
            return {...state, ...reloaded}
        default:
            return state
    }
}