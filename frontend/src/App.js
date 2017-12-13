import React, { Component } from 'react'
import './App.css'
import HeadBar from './components/HeadBar'
import Comment from './components/Comment'
import Post from './components/Post'
import {connect} from 'react-redux'
import {fetchCate} from './actions'

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
            <Post />
          </div>
        )
    }
}

export default connect((state)=>({category:state.category}), ({fetch:fetchCate}))(App);
