const base='http://localhost:3001'

const headers = {
    'Authorization': 'whatever'
}

export const getCategories = () =>
    fetch(`${base}/categories`,{headers})
    .then(res => res.json())

export const getAllPosts = () =>
    fetch(`${base}/posts`,{headers})
    .then(res => res.json())

export const getCommentById = (id) =>
    fetch(`${base}/posts/${id}/comments`,{headers})
    .then(res=>res.json())
