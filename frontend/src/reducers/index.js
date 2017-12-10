import {combineReducers} from 'redux'
import {post} from './post_reducer'
import {comment} from './comment_reducer'
import {category} from './category_reducer'

export default combineReducers({category, post,comment})