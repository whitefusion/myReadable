import React, { Component } from 'react'
import './App.css'
import {HeadBar} from './components/HeadBar'
import PostList from './components/PostList'
import SideBar from './components/SideBar'
import PostDetail from './components/PostDetail'
import PostModal from './components/PostModal'
import {Row, Col} from 'reactstrap'
import {fetchCate,fetchPost,initVote} from './actions'
import {connect} from 'react-redux'
import {Route, BrowserRouter as Router,Switch} from 'react-router-dom'

class App extends Component {

    componentDidMount(){
        this.props.fetchCate()
        this.props.fetchPost()
        .then((res)=>{
          const idList = res.posts.map(p=>p.id)
          return (this.props.initVote(idList))
        })
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
                          return(
                            <Row>
                              <Col md="10" >
                                <PostDetail className="post-detail" id={match.params.id}/>
                              </Col>
                            </Row>
                          )
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

export default connect((state)=>({category:state.category,view:state.view}), ({fetchCate,fetchPost,initVote}))(App);