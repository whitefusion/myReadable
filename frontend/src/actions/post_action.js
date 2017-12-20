import * as api from '../utils/api'

export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const RECEIVE_POST = 'RECEIVE_POST'
export const CHANGE_SCORE = 'CHANGE_SCORE'

export const addPost = (post) => (
    {
        type:ADD_POST,
        post
    }
)

export const createPost = (post) => dispatch => {
    return(
    api
    .upLoadPost(post)
    .then(res => dispatch(addPost({...post,...res})))
)}

export const editPost = ({id,title,body}) => (
    {
        type: EDIT_POST,
        id,
        title,
        body
    }
)

export const updatePost = (post) => dispatch => {
    api
    .savePost(post)
    .then(res=>dispatch(editPost(post)))
}

export const deletePost = (id) => (
    {
        type: DELETE_POST,
        id
    }
)

export const saveDeletePost = (id) => dispatch => {
    api
    .removePost(id)
    .then((res) => dispatch(deletePost(id)))
}

export const receivePost = (posts) => (
    {
        type: RECEIVE_POST,
        posts
    }
)

export const fetchPost = () => dispatch =>(
    api
    .getAllPosts()
    .then(posts => dispatch(receivePost(posts)))
)

export const modifyScore = (id,param) => (
    {
        type: CHANGE_SCORE,
        id,
        param
    }
)

export const saveScoreChange = (id,param) => dispatch =>(
    api
    .changeScore(id,param)
    .then(res=>dispatch(modifyScore(id,param)))
)
