import * as api from '../utils/api'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_PARENT = 'DELETE_PARENT'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const CHANGE_COMMENT_SCORE = 'CHANGE_COMMENT_SCORE'

export const addComment = (comment) => (
    {
        type: ADD_COMMENT,
        comment
    }
)

export const createComment = (c) => dispatch => {
    api
    .upLoadComment(c)
    .then(res => dispatch(addComment(res)))
}

export const editComment = ({id,body,parentId}) => (
    {
        type: EDIT_COMMENT,
        id,
        body,
        parentId
    }
)

export const updateComment = (comment) => dispatch => (
    api
    .saveComment(comment)
    .then(res => dispatch(editComment({id:comment.id,
                                        body:comment.body,
                                        parentId:comment.parentId})))
)

export const deleteComment = (id,parentId) => (
    {
        type: DELETE_COMMENT,
        id,
        parentId
    }
)

export const saveRemoveComment = (id,parentId) => dispatch => {
    api
    .removeComment(id)
    .then(res => dispatch(deleteComment(id,parentId)))
}

export const receiveComment = (comments) => (
    {
        type: RECEIVE_COMMENT,
        comments
    }
)

export const fetchComment = (id) => (dispatch) => {
    api
    .getCommentById(id)
    .then((comments) => dispatch(receiveComment(comments)))
}

export const modifyCommentScore = (id,parentId,param) => (
    {
        type: CHANGE_COMMENT_SCORE,
        id,
        parentId,
        param
    }
)

export const saveCommentScoreChange = (id,parentId,param) => dispatch =>(
    api
    .changeCommentScore(id,param)
    .then(res=>dispatch(modifyCommentScore(id,parentId,param)))
)
