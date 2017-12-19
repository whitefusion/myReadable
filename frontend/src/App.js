import React, { Component } from 'react'
import './App.css'
import {HeadBar} from './components/HeadBar'
import PostList from './components/PostList'
import SideBar from './components/SideBar'
import PostDetail from './components/PostDetail'
import PostModal from './components/PostModal'
import {Row, Col, Button} from 'reactstrap'
import {fetchCate,fetchPost} from './actions'
import {connect} from 'react-redux'
import {Route, BrowserRouter as Router,Switch} from 'react-router-dom'

class App extends Component {
    componentDidMount(){
        this.props.fetchCate()
        this.props.fetchPost()
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
                      <Switch>
                      <Route path="/:category?" exact render={({match})=>(
                        <div>
                          <PostList className='post' category={match.params.category}/>
                          <PostModal title="New Post" catList={this.props.category.categories}/>
                        </div>
                      )} />
                      <Route path="/:categories?/:id?" render={({match})=>{
                        if(this.props.post[match.params.id])
                          return(
                            <Row>
                            <Col md="10" >
                            <PostDetail className="post-detail" content={this.props.post[match.params.id]}/>
                            </Col>
                            </Row>
                            )
                        else
                          return ("")
                      }
                      }/>
                      </Switch>
                      </Col>
                  </Row>
                </div>
              </Router>

          </div>
        )
    }
}

export default connect((state)=>({category:state.category,post:state.post}), ({fetchCate,fetchPost}))(App);