import React, { Component } from 'react'
import './App.css'
import {HeadBar} from './components/HeadBar'
import Post from './components/Post'
import SideBar from './components/SideBar'
import PostModal from './components/PostModal'
import {Row, Col} from 'reactstrap'
import {fetchCate} from './actions'
import {connect} from 'react-redux'

class App extends Component {
    componentDidMount(){
        this.props.fetch()
    }

    render() {
        return (
          <div className="App">
            <HeadBar />
            <Row>
                <Col md="3" sm="auto"><SideBar /></Col>
                <Col md="9" ><Post className='post'/></Col>
            </Row>
            <PostModal name="add-new-post"
             btnBlockCls="new-post-btn-container"
             btnClass="new-post-btn" title="New Post"
             catList={this.props.category.categories}/>
          </div>
        )
    }
}

export default connect((state)=>({category:state.category}), ({fetch:fetchCate}))(App);