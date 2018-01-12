import {
    CHANGE_CATE,
    CHANGE_SORT,
    INIT_VOTE,
    SET_VOTE,
    ADD_VOTE
} from '../actions'

const initState = {currCat: "All", currSort: "date-reverse",currVote:{}}

export default function view (state=initState, action){
    const tempV = {...state}
    switch(action.type){
        case CHANGE_CATE:
            return {
                ...state,
                currCat: action.cat
            }
        case CHANGE_SORT:
            return {
                ...state,
                currSort: action.sort
            }
        case INIT_VOTE:
            let temp = {}
            if(action.idList){
                action.idList.forEach((i)=>{
                    temp[i] = {}
                    temp[i]["upVote"] = false;
                    temp[i]["downVote"] = false;
                })
            }

            return {
                ...state,
                currVote:temp
            }
        case SET_VOTE:
            if(!tempV['currVote'][action.id]) tempV['currVote'][action.id]={}
            tempV['currVote'][action.id][action.v]=!tempV['currVote'][action.id][action.v]
            return tempV
        case ADD_VOTE:
            if(!tempV['currVote'][action.id]){
                tempV['currVote'][action.id] = {}
                tempV['currVote'][action.id]["upVote"] = false
                tempV['currVote'][action.id]["downVote"] = false
            }
            return tempV
        default:
            return state
    }
}