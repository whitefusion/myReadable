import React, { Component } from 'react'
import './App.css'
import HeadBar from './components/HeadBar'
import Post from './components/Post'
import SideBar from './components/SideBar'
import PostModal from './components/PostModal'
import {Row, Col} from 'reactstrap'

class App extends Component {
    render() {
        return (
          <div className="App">
            <HeadBar />
            <Row>
                <Col md="3"><SideBar /></Col>
                <Col md="9"><Post className='post'/></Col>
            </Row>
            <PostModal name="add-new-post"
             btnBlockCls="new-post-btn-container"
             btnClass="new-post-btn" title="New Post"/>
          </div>
        )
    }
}

export default (App);
