import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    fetchPost,
    editPost,
    deletePost
} from '../actions'

class Post extends Component {
    componentDidMount(){
        this.props.fetch()
        console.log(this.props.post)
    }

    render() {
        const {edit,remove,fetch} = this.props
        return(
            <div>
            <p>say something</p>
            {
            this.props.post ?
            Object.entries(this.props.post).map((k,v)=> (<div>{v.body}</div>))
            : ('')}
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
  return {
    edit: (data) => dispatch(editPost(data)),
    remove: (data) => dispatch(deletePost(data)),
    fetch:fetchPost
  }
}

export default connect(state=>({post:state.post}),mapDispatchToProps)(Post)