import * as api from '../utils/api'

const ADD_POST = 'ADD_POST'
const EDIT_POST = 'EDIT_POST'
const DELETE_POST = 'DELETE_POST'
const RECEIVE_POST = 'RECEIVE_POST'

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

const deletePost = ({id}) => (
    {
        type: DELETE_POST,
        id
    }
)

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



export {
    fetchPost,
    editPost,
    updatePost,
    addPost,
    deletePost,
    receivePost,
    createPost,
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    RECEIVE_POST
}
