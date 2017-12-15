import * as api from '../utils/api'
const ADD_COMMENT = 'ADD_COMMENT'
const EDIT_COMMENT = 'EDIT_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'
const DELETE_PARENT = 'DELETE_PARENT'
const RECEIVE_COMMENT = 'RECEIVE_COMMENT'

const addComment = (comment) => (
    {
        type: ADD_COMMENT,
        comment
    }
)

const createComment = (c) => dispatch => {
    api
    .upLoadComment(c)
    .then(res => dispatch(addComment(c)))
}

const editComment = ({id,body,parentId}) => (
    {
        type: EDIT_COMMENT,
        id,
        body,
        parentId
    }
)

const updateComment = (comment) => dispatch => (
    api
    .saveComment(comment)
    .then(res => dispatch(editComment({id:comment.id,
                                        body:comment.body,
                                        parentId:comment.parentId})))
)

const deleteComment = (id,parentId) => (
    {
        type: DELETE_COMMENT,
        id,
        parentId
    }
)

const saveRemoveComment = (id,parentId) => dispatch => {
    api
    .removeComment(id)
    .then(res => dispatch(deleteComment(id,parentId)))
}

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
    fetchComment,
    createComment,
    updateComment,
    saveRemoveComment,
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_PARENT,
    DELETE_COMMENT,
    RECEIVE_COMMENT
}
