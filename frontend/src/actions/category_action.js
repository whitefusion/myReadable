import * as api from '../utils/api'
const RECEIVE_CATE = 'RECEIVE_CATE'

const receiveCate = (cats) => (
    {
        type: RECEIVE_CATE,
        cats
    }
)

const fetchCate = () => dispatch => (
    api
    .getCategories()
    .then(cats => dispatch(receiveCate(cats)))
)

export {
    RECEIVE_CATE,
    receiveCate,
    fetchCate
}