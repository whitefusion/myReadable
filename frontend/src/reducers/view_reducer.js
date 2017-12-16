import React from 'react'
import {
    CHANGE_CATE,
    CHANGE_SORT
} from '../actions'

const initState = {currCat: "All", currSort: "date-normal"}

export default function view (state=initState, action){
    switch(action.type){
        case "CHANGE_CATE":
            return {
                ...state,
                currCat: action.cat
            }
        case "CHANGE_SORT":
            return {
                ...state,
                currSort: action.sort
            }
        default:
            return state
    }
}