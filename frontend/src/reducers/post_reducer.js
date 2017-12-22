import {
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    RECEIVE_POST,
    CHANGE_SCORE
} from '../actions'

export default function post (state={},action){
    const tempPosts = {...state}
    switch(action.type){
        case ADD_POST:
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
            tempPosts[action.id].deleted = true
            return tempPosts
        case RECEIVE_POST:
            const reloaded= {}
            action.posts.forEach((p) => reloaded[p.id]=p)
            return reloaded
        case CHANGE_SCORE:
            tempPosts[action.id].voteScore+=(action.param==="upVote") ? 1 : -1
            return tempPosts
        default:
            return state
    }
}