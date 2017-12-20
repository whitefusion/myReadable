import React, { Component } from 'react'
import * as fa from 'react-icons/lib/fa/'
import { Card,
         Button,
         CardTitle,
         CardSubtitle,
         CardText,
         Badge
       } from 'reactstrap';
import { getDate, partial } from '../utils/utility.js'
import Comment from './Comment'
import EditModal from './EditModal'
import { saveDeletePost, saveScoreChange, setVote } from '../actions'
import {connect} from 'react-redux'
import {Link,Route} from 'react-router-dom'

class PostCard extends Component {
    toggleVote = (evt) => {
      const n = evt.target.name
      const changeVote = partial(this.props.setVote,this.props.id)
      const sendVote = partial(this.props.change,this.props.id)
      switch(n){
        case "up-o":
          changeVote("upVote")
          sendVote("upVote")
          return
        case "up":
          changeVote("upVote")
          sendVote("downVote")
          return
        case "down-o":
          changeVote("downVote")
          sendVote("downVote")
          return
        case "down":
          changeVote("downVote")
          sendVote("upVote")
          return
      }

    }

    render() {
        const p = this.props.post[this.props.id]
        return(
            <Card body className='card'>
              <CardTitle className='post-title'>
                <Link to={`/${p.category}/${p.id}`}>
                <p className='title'>{p.title}</p>
                </Link>
                <Badge color="info" className="post-badge">{p.category}</Badge>
                {
                this.props.vote ? (
                <div className='vote'>
                  {this.props.vote.upVote ?
                    <button name="up" className="v-btn vote-up-btn" onClick={this.toggleVote}></button>:
                    <button name="up-o" disabled={this.props.vote.downVote} className='v-btn vote-up-o-btn' onClick={this.toggleVote}></button>
                  }
                  <div className='score'>{ ` ${p.voteScore} ` }</div>
                  {this.props.vote.downVote ?
                    <button name="down" className="v-btn vote-down-btn" onClick={this.toggleVote}></button>:
                    <button name="down-o" disabled={this.props.vote.upVote} className="v-btn vote-down-o-btn" onClick={this.toggleVote}></button>
                  }
                </div>) : ("")
              }
              </CardTitle>
              <CardSubtitle>
                <div className="post-author-date">By <strong>{p.author}</strong>, {getDate(p.timestamp)}</div>
                <div className="comment-number"> {p.commentCount} {p.commentCount > 1 ? "comments" : "comment"} </div>
              </CardSubtitle>
            </Card>
        )
    }
}

export default connect((state,ownProps)=>({post:state.post,vote:state.view.currVote[ownProps.id]}),
                {removeCurrPost: saveDeletePost, change:saveScoreChange, setVote})(PostCard);