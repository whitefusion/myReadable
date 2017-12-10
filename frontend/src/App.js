import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux'
import {getCategories} from './utils/api'
import * as action from './actions'
import {HeadBar} from './components'

class App extends Component {
    state = {
        allCats: []
    }

    componentDidMount(){
        getCategories().then((cats)=>{
            this.setState({allCats:cats.categories})
        })
    }

    render() {
        return (
          <div className="App">
            <HeadBar catList={this.state.allCats}/>
          </div>
        )
    }
}

export default App;
