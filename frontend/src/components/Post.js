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
    }

    render() {
        return(
            <div>
            {
                this.props.post ?
                Object.entries(this.props.post).map(([k,v])=> {
                    return (<div key={k}>{v.body}</div>)
                })
                : ('')
            }
            </div>
        )
    }
}

export default connect((state)=>({post:state.post}),
                        ({fetch:fetchPost}))(Post);