import {
    CHANGE_CATE,
    CHANGE_SORT,
    INIT_VOTE,
    SET_VOTE
} from '../actions'

const initState = {currCat: "All", currSort: "date-reverse",currVote:{}}

export default function view (state=initState, action){
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
            const tempV = {...state}
            if(!tempV['currVote'][action.id]) tempV['currVote'][action.id]={}
            tempV['currVote'][action.id][action.v]=!tempV['currVote'][action.id][action.v]
            return tempV
        default:
            return state
    }
}