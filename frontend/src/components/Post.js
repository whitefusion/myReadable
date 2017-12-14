import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    fetchPost,
    editPost,
    deletePost
} from '../actions'

import PostCard from './PostCard'

import {
         Row,
         Col
       } from 'reactstrap';

class Post extends Component {

    componentDidMount(){
        this.props.fetch()
    }

    renderCard = (p) => (
          <Col key={p.id} sm="12" md={{ size: 8, offset: 2 }} className='col'>
            <PostCard content={p}/>
          </Col>
    )

    render() {
        return(
            <Row className='row'>
            {
                this.props.post ?
                Object.entries(this.props.post).map(([k,v])=>
                    (
                        this.renderCard(v)
                    )
                )
                : ('')
            }
            </Row>
        )
    }
}

export default connect((state)=>({post:state.post}),
                        ({fetch:fetchPost}))(Post);