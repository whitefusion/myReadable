import React, {Component} from 'react'
import { Card,
         Button,
         CardTitle,
         CardSubtitle,
         Badge
       } from 'reactstrap';
import {partial, getDate } from '../utils/utility.js'
import Comment from './Comment'
import EditModal from './EditModal'
import { saveDeletePost, saveScoreChange, setVote} from '../actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class PostDetail extends Component {
    state = {
      deleted:false
    }

    handleDelete = (evt) => {
      evt.preventDefault();
      this.props.removeCurrPost(this.props.id)
      this.setState({deleted:true})
    }

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
        default:
          return
      }
    }
    render() {
        let p = this.props.post ? this.props.post[this.props.id] : ""
        if(!this.state.deleted && p){
          let count = 0
          if(this.props.comment[p.id]) {
            this.props.comment[p.id].forEach((c)=>{
              if(!c.deleted) count+=1
            })
          }
        return(
        <Card body className='card'>
          <CardTitle className='post-detail-title'>
            <p className='title'>{p.title}</p>
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
            <Badge color="info" className="post-badge">{p.category}</Badge>
            <div className="comment-number"> {count} {count > 1 ? "comments" : "comment"} </div>
          </CardSubtitle>
          <pre className="post-body">{p.body}</pre>

          <div className="post-btn-container">
            <EditModal btnClass='post-btn' title='Edit Post' name='Edit' content={p}/>
            <Button color='danger' outline size="sm" className='post-btn' onClick={this.handleDelete}> Delete </Button>
          </div>
          <Comment id={p.id}/>
        </Card>)
    } else {
        return (<div>
                    <p>The post does not exist.</p>
                    <Link to="/"> Back to post list </Link>
                </div>)
    }
    }
}

// const getCurrVote = (voteMap, id) => (voteMap.currVote[id])

export default connect((state,ownProps)=>({post:state.post,vote:state.view.currVote[ownProps.id],comment:state.comment}),
                {removeCurrPost: saveDeletePost, change:saveScoreChange, setVote})(PostDetail);