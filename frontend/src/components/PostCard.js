import React, { Component } from 'react'
import * as fa from 'react-icons/lib/fa/'
import { Card,
         Button,
         CardTitle,
         CardSubtitle,
         CardText,
       } from 'reactstrap';
import { getDate } from '../utils/utility.js'
import PostModal from './PostModal'
import Comment from './Comment'

class PostCard extends Component {
    state = {
      upVote: false,
      downVote: false,
      showComment: false
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
              <CardSubtitle>By {p.author}, {getDate(p.timestamp)}</CardSubtitle>
              <CardText>{p.body}</CardText>
              <div className="button-container">
                <Button color='primary' size="sm" className='button' onClick={this.toggleComment}> Comment </Button>
                <PostModal title='Edit Post' name='Edit' content={p}/>
                <Button color='danger' size="sm" className='button'> Delete </Button>
              </div>
              {this.state.showComment ?
                <Comment id={p.id}/> : ('')}
            </Card>
        )
    }
}

export default PostCard;