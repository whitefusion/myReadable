export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

function addPost({id,title,author,content}){
    return {
        type:ADD_POST,
        id,
        title,
        author,
        content
    }
}

function editPost({id,content}){
    return {
        type: EDIT_POST,
        id,
        content
    }
}

function deletePost({id}){
    return {
        type: DELETE_POST,
        id
    }
}

function addComment({id,content, author, time, parentId}){
    return {
        type: ADD_COMMENT,
        id,
        content,
        author,
        time,
        parentId
    }
}

function editComment({id,content}){
    return {
        type: EDIT_COMMENT,
        content,
        id
    }
}

function deleteComment({id}) {
    return {
        type: DELETE_COMMNET,
        id
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