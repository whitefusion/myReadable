import * as api from '../utils/api'

const ADD_POST = 'ADD_POST'
const EDIT_POST = 'EDIT_POST'
const DELETE_POST = 'DELETE_POST'
const RECEIVE_POST = 'RECEIVE_POST'
const CHANGE_SCORE = 'CHANGE_SCORE'
const addPost = (post) => (
    {
        type:ADD_POST,
        post
    }
)

const createPost = (post) => dispatch => {
    return(
    api
    .upLoadPost(post)
    .then(res => dispatch(addPost({...post,...res})))
)}

const editPost = ({id,title,body}) => (
    {
        type: EDIT_POST,
        id,
        title,
        body
    }
)

const updatePost = (post) => dispatch => {
    api
    .savePost(post)
    .then(res=>dispatch(editPost(post)))
}

const deletePost = (id) => (
    {
        type: DELETE_POST,
        id
    }
)

const saveDeletePost = (id) => dispatch => {
    api
    .removePost(id)
    .then((res) => dispatch(deletePost(id)))
}

const receivePost = (posts) => (
    {
        type: RECEIVE_POST,
        posts
    }
)

const fetchPost = () => dispatch =>(
    api
    .getAllPosts()
    .then(posts => dispatch(receivePost(posts)))
)

const modifyScore = (id,param) => (
    {
        type: CHANGE_SCORE,
        id,
        param
    }
)

const saveScoreChange = (id,param) => dispatch =>(
    api
    .changeScore(id,param)
    .then(res=>dispatch(modifyScore(id,param)))
)

export {
    fetchPost,
    editPost,
    updatePost,
    addPost,
    deletePost,
    receivePost,
    saveDeletePost,
    createPost,
    saveScoreChange,
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    RECEIVE_POST,
    CHANGE_SCORE
}
