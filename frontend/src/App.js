import React, { Component } from 'react'
import './App.css'
import HeadBar from './components/HeadBar'
import Post from './components/Post'
import {connect} from 'react-redux'
import {fetchCate} from './actions'
import PostModal from './components/PostModal'

class App extends Component {
    componentDidMount(){
        this.props.fetch()
    }

    render() {
        return (
          <div className="App">
            <HeadBar
            catList={this.props.category ?
                this.props.category.categories
                : ('')}/>
            <Post className='post'/>
            <PostModal name="add-new-post"
            btnBlockCls="new-post-btn-container" btnClass="new-post-btn" title="New Post"/>
          </div>
        )
    }
}

export default connect((state)=>({category:state.category}), ({fetch:fetchCate}))(App);
