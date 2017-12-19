import React, { Component } from 'react'
import './App.css'
import {HeadBar} from './components/HeadBar'
import Post from './components/Post'
import SideBar from './components/SideBar'
import PostModal from './components/PostModal'
import {Row, Col, Button} from 'reactstrap'
import {fetchCate} from './actions'
import {connect} from 'react-redux'
import {Route, BrowserRouter as Router} from 'react-router-dom'

class App extends Component {
    componentDidMount(){
        this.props.fetch()
    }

    render() {
        return (
          <div className="App">
            <HeadBar />
              <Router>
                <div>
                  <Row>
                      <Col md="3" sm="auto"><SideBar /></Col>
                      <Col md="9" >
                      <Route path="/:category?" render={({match})=>(
                        <Post className='post' category={match.params.category}/>
                      )} />
                      </Col>
                  </Row>
                </div>
              </Router>
                <PostModal title="New Post" catList={this.props.category.categories}/>
          </div>
        )
    }
}

export default connect((state)=>({category:state.category}), ({fetch:fetchCate}))(App);