import React, {Component} from 'react'
import {Form, FormGroup, Label, Input} from 'reactstrap';
import CategorySelect from './CategorySelect'

class SideBar extends Component {
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
                  <Input className="sort-select" type="select" name="select" id="sortBy">
                    <option>post date : old to new</option>
                    <option>post date : new to old</option>
                    <option>vote score : low to high</option>
                    <option>vote score : high to low</option>
                  </Input>
                </FormGroup>
              </Form>
            </div>
        )
    }
}

export default SideBar