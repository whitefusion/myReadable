import React, {Component} from 'react'
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

class PostDetail extends Component {
    p = this.props.content
    state = {
      upVote: false,
      downVote: false,
      showComment: false
    }

    handleDelete = (evt) => {
      evt.preventDefault();
      this.props.removeCurrPost(this.props.content.id)
    }

    toggleComment = () => {
      this.setState({showComment: !this.state.showComment})
    }

    toggleVote = (evt) => {
      const n = evt.target.name
      if(n === "up-o") {
        this.setState({upVote:true})
        this.props.change(this.p.id,'upVote')
      } else if(n === "down-o") {
        this.setState({downVote:true})
        this.props.change(this.p.id,'downVote')
      } else if(n === "up"){
        this.setState({upVote: false})
        this.props.change(this.p.id,'downVote')
      } else if(n === "down"){
        this.setState({downVote:false})
        this.props.change(this.p.id,'upVote')
      }
    }
    render() {
        const p = this.p
        if(p){
        return(
        <Card body className='card'>
          <CardTitle className='post-title'>
            <Link to={`/${p.category}/${p.id}`}>
            <p className='title'>{p.title}</p>
            </Link>
            <div className='vote'>
              {this.state.upVote ?
                <button name="up" className="v-btn vote-up-btn" onClick={this.toggleVote}></button>:
                <button name="up-o" disabled={this.state.downVote} className='v-btn vote-up-o-btn' onClick={this.toggleVote}></button>
              }
              <div className='score'>{ ` ${p.voteScore} ` }</div>
              {this.state.downVote ?
                <button name="down" className="v-btn vote-down-btn" onClick={this.toggleVote}></button>:
                <button name="down-o" disabled={this.state.upVote} className="v-btn vote-down-o-btn" onClick={this.toggleVote}></button>
              }
            </div>
          </CardTitle>
          <CardSubtitle>
            <div className="post-author-date">By {p.author}, {getDate(p.timestamp)}</div>
            <Badge color="info" className="post-badge">{p.category}</Badge>
          </CardSubtitle>
          <pre className="post-body">{p.body}</pre>

          <div className="post-btn-container">
            <EditModal btnClass='post-btn' title='Edit Post' name='Edit' content={p}/>
            <Button color='danger' outline size="sm" className='post-btn' onClick={this.handleDelete}> Delete </Button>
          </div>
          <Comment id={p.id}/>
        </Card>)
    } else {
        return ("")
    }
    }
}

export default connect((state)=>({}),
                {removeCurrPost: saveDeletePost, change:saveScoreChange})(PostDetail);