import {combineReducers} from 'redux'
import post from './post_reducer'
import comment from './comment_reducer'
import category from './category_reducer'
import view from './view_reducer'

export default combineReducers({post,comment,category,view})