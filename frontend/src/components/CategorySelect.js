import React, {Component} from 'react'
import {Input} from 'reactstrap'
import {fetchCate} from '../actions'
import {connect} from 'react-redux'

class CategorySelect extends Component {
    componentDidMount(){
        this.props.fetch()
    }

    render(){
        const catList = this.props.category.categories
        return (
            <Input className="category-select"
            type="select" name="select"
            id="selectCategory"
            value={this.props.currCat}
            onChange={this.props.changeHandler}>
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

export default connect((state)=>({category:state.category}), ({fetch:fetchCate}))(CategorySelect);