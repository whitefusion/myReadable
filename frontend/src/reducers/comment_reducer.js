import {
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,
    DELETE_PARENT,
    RECEIVE_COMMENT
} from '../actions'

import {generateId,generateCommentId} from '../utils/utility'

export default function comment (state={},action){
    switch(action.type){
        case ADD_COMMENT:
            const {author,body,parentId} = action
            return {
                author,body,parentId,
                id: generateCommentId(),
                timestamp: Date.now()
            }
        case EDIT_COMMENT:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    body:action.body
                }
            }
        case DELETE_COMMENT:
            return {
                ...state,
                [action.id]:{
                    ...state[action.id],
                    deleted:true
                }
            }
        case DELETE_PARENT:
            let temp_state = {...state}
            Object.keys(temp_state).forEach(k=>{
                if(temp_state[k].parentId === action.parentId)
                    temp_state[k].parentDeleted = true
            })
            return temp_state
        case RECEIVE_COMMENT:
            console.log(action.comments)
            if(action.comments.length)
                return {...state, [action.comments[0].parentId]:action.comments}
            else
                return state
        default:
            return state
    }
}