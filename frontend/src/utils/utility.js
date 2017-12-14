export const generateId = () => (Math.random().toString(36).substr(2, 22))
export const generateCommentId = () => (Math.random().toString(36).substr(2, 21))
export const getDate =(ts) => {
    const t = new Date(ts)
    return t.toDateString()
}