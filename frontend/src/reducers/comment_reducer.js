import {
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,
    RECEIVE_COMMENT,
    CHANGE_COMMENT_SCORE
} from '../actions'

export default function comment (state={},action){
    let tempComments = {...state}, targetId = -1;
    switch(action.type){
        case ADD_COMMENT:
            const pId = action.comment.parentId
            return {
                ...state,
                [pId]: state[pId]?state[pId].concat(action.comment):[action.comment]
            }
        case EDIT_COMMENT:
            tempComments[action.parentId].forEach((c,index) => {
                if (c.id === action.id){
                    targetId=index
                }
            })
            if(targetId >= 0){
                tempComments[action.parentId][targetId].body=action.body
            }
            return tempComments
        case DELETE_COMMENT:
            tempComments[action.parentId].forEach((c,index) => {
                if (c.id === action.id){
                    targetId=index
                }
            })
            if(targetId >= 0){
                tempComments[action.parentId][targetId].deleted=true
            }
            return tempComments
        case RECEIVE_COMMENT:
            console.log(action.comments)
            if(action.comments.length)
                return {...state, [action.comments[0].parentId]:action.comments}
            else
                return state
        case CHANGE_COMMENT_SCORE:
            tempComments[action.parentId].forEach((c,index) => {
                if (c.id === action.id){
                    targetId=index
                }
            })
            if(targetId >= 0){
                tempComments[action.parentId][targetId].voteScore+=(action.param==="upVote") ? 1 : -1
            }
            return tempComments
        default:
            return state
    }
}