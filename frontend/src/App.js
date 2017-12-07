import React, { Component } from 'react';
import './App.css';
import {getCategories} from './utils/api'

class App extends Component {
    state = {
        allCats : {}
    }

    componentDidMount(){
        getCategories().then((cats)=>{
            this.setState({allCats:cats.categories})
        })
    }

    render() {
        return (
          <div className="App">
              {this.state.allCats.map((c) =>
                (null)
              )}
          </div>
        );
    }
}

export default App;
