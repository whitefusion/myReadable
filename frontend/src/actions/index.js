export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_PARENT = 'DELETE_PARENT'

function addPost({title,author,body,category}){
    return {
        type:ADD_POST,
        title,
        author,
        body,
        category
    }
}

function editPost({id,body}){
    return {
        type: EDIT_POST,
        id,
        body
    }
}

function deletePost({id}){
    return {
        type: DELETE_POST,
        id
    }
}

function addComment({id,body, author, parentId}){
    return {
        type: ADD_COMMENT,
        body,
        author,
        parentId
    }
}

function editComment({id,body}){
    return {
        type: EDIT_COMMENT,
        body,
        id
    }
}

function deleteComment({id}) {
    return {
        type: DELETE_COMMNET,
        id
    }
}

function deleteParent({parentId}) {
    return {
        type : DELETE_PARENT,
        parentId
    }
}
module.exports = {
    addPost,
    editPost,
    deletePost,
    addComment,
    editComment,
    deleteComment
}