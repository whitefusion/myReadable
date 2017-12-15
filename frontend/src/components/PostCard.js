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
import { saveDeletePost } from '../actions'
import {connect} from 'react-redux'

class PostCard extends Component {
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

    toggleUpVote = () => {
      this.setState({upVote: !this.state.upVote})
    }

    toggleDownVote = () => {
      this.setState({downVote: !this.state.downVote})
    }

    render() {
        const p = this.props.content
        return(
            <Card body className='card'>

              <CardTitle className='post-title'>

                <p className='title'>{p.title}</p>
                <div className='vote'>
                  {this.state.upVote ?
                    <fa.FaThumbsUp onClick={this.toggleUpVote}/>:
                    <fa.FaThumbsOUp onClick={this.toggleUpVote}/>
                  }
                  <div className='score'>{ ` ${p.voteScore} ` }</div>
                  {this.state.downVote ?
                    <fa.FaThumbsDown onClick={this.toggleDownVote}/>:
                    <fa.FaThumbsODown onClick={this.toggleDownVote}/>
                  }
                </div>
              </CardTitle>
              <CardSubtitle>
                By {p.author}, {getDate(p.timestamp)}
                <Badge color="dark" className="post-badge" pill>{p.category}</Badge>
              </CardSubtitle>
              <pre>{p.body}</pre>

              <div className="button-container">
                <Button color='primary' size="sm" className='post-btn' onClick={this.toggleComment}> Comment </Button>
                <EditModal btnClass='post-btn' title='Edit Post' name='Edit' content={p}/>
                <Button color='danger' size="sm" className='post-btn' onClick={this.handleDelete}> Delete </Button>
              </div>
              {this.state.showComment ?
                <Comment id={p.id}/> : ('')}
            </Card>
        )
    }
}

export default connect((state)=>({post:state.post}),
                {removeCurrPost: saveDeletePost})(PostCard);