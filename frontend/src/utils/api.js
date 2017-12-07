const base='http://localhost:3001'

const headers = {
    'Authorization': 'green pepper & pork slice'
}

export const getCategories = () =>
    fetch(`${base}/categories`,{headers})
    .then(res => res.json())