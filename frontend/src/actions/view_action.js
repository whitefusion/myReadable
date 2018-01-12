export const CHANGE_CATE = 'CHANGE_CATE'
export const CHANGE_SORT = 'CHANGE_SORT'
export const INIT_VOTE = "INIT_VOTE"
export const SET_VOTE = "SET_VOTE"
export const ADD_VOTE = "ADD_VOTE"

export const changeCat = (cat) => (
    {
        type: CHANGE_CATE,
        cat
    }
)

export const changeSort = (sort) => (
    {
        type: CHANGE_SORT,
        sort
    }
)

export const initVote = (idList) => (
    {
        type: INIT_VOTE,
        idList
    }
)

export const setVote = (id,v) => (
    {
        type:SET_VOTE,
        id,
        v
    }
)

export const addVote = (id) => (
    {
        type: ADD_VOTE,
        id
    }
)