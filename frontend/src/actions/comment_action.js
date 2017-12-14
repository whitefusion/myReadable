import * as api from '../utils/api'
const ADD_COMMENT = 'ADD_COMMENT'
const EDIT_COMMENT = 'EDIT_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'
const DELETE_PARENT = 'DELETE_PARENT'
const RECEIVE_COMMENT = 'RECEIVE_COMMENT'

const addComment = ({id,body, author, parentId}) => (
    {
        type: ADD_COMMENT,
        body,
        author,
        parentId
    }
)

const editComment = ({id,body}) => (
    {
        type: EDIT_COMMENT,
        body,
        id
    }
)

const deleteComment = ({id}) => (
    {
        type: DELETE_COMMENT,
        id
    }
)

const deleteParent = ({parentId}) => (
    {
        type : DELETE_PARENT,
        parentId
    }
)

const receiveComment = (comments) => (
    {
        type: RECEIVE_COMMENT,
        comments
    }
)

const fetchComment = (id) => (dispatch) => {
    api
    .getCommentById(id)
    .then((comments) => dispatch(receiveComment(comments)))
}

export {
    addComment,
    editComment,
    deleteComment,
    deleteParent,
    fetchComment,
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_PARENT,
    DELETE_COMMENT,
    RECEIVE_COMMENT
}
