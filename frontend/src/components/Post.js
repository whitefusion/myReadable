import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    fetchPost,
    editPost,
    deletePost
} from '../actions'

import PostCard from './PostCard'

import { Row,
         Col
       } from 'reactstrap';

class Post extends Component {
    componentDidMount(){
        this.props.fetch()
    }

    renderCard = (p) => (
          <Col key={p.id} sm="11" md={{ size: 10}} className='post-col'>
            <PostCard content={p}/>
          </Col>
    )

    render() {
        const allPosts = this.props.post
        const validPosts = allPosts ? Object.values(allPosts).filter((v) => !v.deleted):([])
        return(
            <Row id='post-main'>
            {
                validPosts.length ?
                validPosts.map((v)=> this.renderCard(v)) :
                (<p className="no-posts">No Posts to show.</p>)
            }
            </Row>
        )
    }
}

export default connect((state)=>({post:state.post}),
                        ({fetch:fetchPost}))(Post);