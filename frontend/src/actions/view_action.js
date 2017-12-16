export const CHANGE_CATE = 'CHANGE_CATE'
export const CHANGE_SORT = 'CHANGE_SORT'

export const changeCat = (cat) => (
    {
        type: CHANGE_CATE,
        cat
    }
)

export const changeSort = (sort) => (
    {
        type: CHANGE_SORT,
        sort
    }
)