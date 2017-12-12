import {RECEIVE_CATE} from '../actions'

export default function category (state={},action){
    switch(action.type){
        case RECEIVE_CATE:
            return action.cats
        default:
            return state
    }
}