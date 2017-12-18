import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    fetchPost,
    editPost,
    deletePost
} from '../actions'
import {Route} from 'react-router-dom'

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

    sortBySelect = (posts,sort) => {
        if(!posts.length) return posts
        switch(sort){
            case "date-reverse":
                return posts.sort((a,b) => b.timestamp - a.timestamp)
            case "date-normal":
                return posts.sort((a,b) => a.timestamp-b.timestamp)
            case "score-increase":
                return posts.sort((a,b) => a.voteScore-b.voteScore)
            case "score-decrease":
                return posts.sort((a,b) => b.voteScore - a.voteScore)
            default:
                return posts
        }
    }

    render() {
        let currCat = this.props.view.currCat
        const currSort = this.props.view.currSort
        const allPosts = this.props.post
        const validPosts = allPosts ? Object.values(allPosts).filter((v) => !v.deleted):([])
        let showPosts = validPosts
        if(currCat !== "All"){
            showPosts = validPosts.length ? validPosts.filter((p)=>(p.category===this.props.view.currCat)):([])
        }
        const sortedPosts = this.sortBySelect(showPosts,currSort)
        currCat = currCat === "All" ? "" : currCat
        return(
            <Row id='post-main'>
            {
                sortedPosts.length ?
                sortedPosts.map((v)=> this.renderCard(v)) :
                (<p className="no-posts">No Posts to show.</p>)
            }
            </Row>
        )
    }
}

export default connect((state)=>({post:state.post,view:state.view}),
                        ({fetch:fetchPost}))(Post);