import React, { Component } from 'react'
import * as fa from 'react-icons/lib/fa/'
import { Card,
         Button,
         CardTitle,
         CardSubtitle,
         CardText,
         Badge
       } from 'reactstrap';
import { getDate } from '../utils/utility.js'
import Comment from './Comment'
import EditModal from './EditModal'
import { saveDeletePost, saveScoreChange } from '../actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class PostCard extends Component {
    p = this.props.content

    render() {
        const p = this.p
        return(
            <Card body className='card'>
              <CardTitle className='post-title'>
                <Link to={`/${p.category}/${p.id}`}>
                <p className='title'>{p.title}</p>
                </Link>
                <Badge color="info" className="post-badge">{p.category}</Badge>
                <div className='vote'>
                  <div className='score'>{ `votes: ${p.voteScore} ` }</div>
                </div>
              </CardTitle>
              <CardSubtitle>
                <div className="post-author-date">By <strong>{p.author}</strong>, {getDate(p.timestamp)}</div>
                <div className="comment-number"> {p.commentCount} {p.commentCount > 1 ? "comments" : "comment"} </div>
              </CardSubtitle>
            </Card>
        )
    }
}

export default connect((state)=>({post:state.post}),
                {removeCurrPost: saveDeletePost, change:saveScoreChange})(PostCard);