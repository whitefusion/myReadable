import React, {Component} from 'react'
import {Form, FormGroup, Label, Input} from 'reactstrap';
import CategorySelect from './CategorySelect'
import {connect} from 'react-redux'
import {changeSort} from '../actions'

class SideBar extends Component {
    state = {
      currSort: this.props.view.currSort
    }

    changeHandler = (evt) => {
      evt.preventDefault()
      const v = evt.target.value
      this.setState({currSort:v})
      this.props.sortBy(v)
    }

    render() {
        return(
            <div className='sidebar-container'>
              <Form className='select-form'>
                <FormGroup>
                  <Label>Category:</Label>
                  <CategorySelect showAll={1}/>
                </FormGroup>
                <FormGroup>
                  <Label>Sort By:</Label>
                  <Input className="sort-select"
                   type="select" name="select"
                   value={this.state.currSort}
                   onChange={this.changeHandler}
                   id="sortBy">
                    <option value="date-normal">post date : old to new</option>
                    <option value="date-reverse">post date : new to old</option>
                    <option value="score-increase">vote score : low to high</option>
                    <option value="score-decrease">vote score : high to low</option>
                  </Input>
                </FormGroup>
              </Form>
            </div>
        )
    }
}

export default connect((state)=>({view:state.view}),{sortBy: changeSort})(SideBar)