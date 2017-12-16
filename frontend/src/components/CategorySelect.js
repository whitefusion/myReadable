import React, {Component} from 'react'
import {Input} from 'reactstrap'
import {fetchCate,changeCat} from '../actions'
import {connect} from 'react-redux'

class CategorySelect extends Component {
    state = {
        currCat: this.props.view.currCat
    }

    componentDidMount(){
        this.props.fetch()
    }

    changeHandler = (evt) => {
        evt.preventDefault()
        const v= evt.target.value
        this.setState({currCat:v})
        this.props.showCat(v)
    }

    render(){
        const catList = this.props.category.categories
        return (
            <Input className="category-select"
            type="select" name="select"
            id="selectCategory"
            value={this.state.currCat}
            onChange={this.changeHandler}>
                {
                    this.props.showAll ?
                    <option value="All" key="0">All</option>
                    : ('')
                }
                {catList ?
                 catList.map((c,index) => (<option value={c.name} key={index+1}>{c.name}</option>))
                : ('')}
            </Input>
        )
    }
}

export default connect((state)=>({category:state.category,view:state.view}), ({fetch:fetchCate, showCat: changeCat}))(CategorySelect);