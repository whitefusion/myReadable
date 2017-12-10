const ADD_POST = 'ADD_POST'
const EDIT_POST = 'EDIT_POST'
const DELETE_POST = 'DELETE_POST'
const RECEIVE_POST = 'RECEIVE_POST'

const addPost = ({title,author,body,category}) => (
    {
        type:ADD_POST,
        title,
        author,
        body,
        category
    }
)

const editPost = ({id,body}) => (
    {
        type: EDIT_POST,
        id,
        body
    }
)

const deletePost = ({id}) => (
    {
        type: DELETE_POST,
        id
    }
)


