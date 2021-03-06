
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

export const upLoadPost = (post) => {
    return fetch(`${base}/posts`,
    {
        method: "POST",
        headers: {
            'Authorization': 'whatever',
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    .then(res=>res.json())
}

export const savePost = (post) => {
    return fetch(`${base}/posts/${post.id}`,
    {
        method: "PUT",
        headers: {
            'Authorization': 'whatever',
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({title: post.title, body: post.body})
    })
    .then(res=>res.json())
}

export const removePost = (id)=> {
    return fetch(`${base}/posts/${id}`,
    {
        method: "DELETE",
        headers
    })
}

export const upLoadComment = (comment) => {
    return fetch(`${base}/comments`,
    {
        method: "POST",
        headers: {
            'Authorization': 'whatever',
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    .then(res=>res.json())
}

export const saveComment = (comment) => {
    return fetch(`${base}/comments/${comment.id}`,
    {
        method: "PUT",
        headers: {
            'Authorization': 'whatever',
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({timestamp: Date.now(),body: comment.body})
    })
    .then(res=>res.json())
}

export const removeComment = (id) => {
    return fetch(`${base}/comments/${id}`,
    {
        method: "DELETE",
        headers
    })
    .then(res=>res.json())
}

export const changeScore = (id,param) => {
    return fetch(`${base}/posts/${id}`,{
        method: "POST",
        headers: {
            'Authorization': 'whatever',
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({option:param})
    })
    .then(res=>res.json())
}

export const changeCommentScore = (id,param) => {
    return fetch(`${base}/comments/${id}`,{
        method: "POST",
        headers: {
            'Authorization': 'whatever',
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({option:param})
    })
    .then(res=>res.json())
}