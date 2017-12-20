import React, {Component} from 'react'
import {Form, FormGroup, Label, Input,
        ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import CategorySelect from './CategorySelect'
import {connect} from 'react-redux'
import {changeSort} from '../actions'
import {Link} from 'react-router-dom'
import {fetchCate,changeCat} from '../actions'

class SideBar extends Component {
    state = {
      currSortName: "date: latest",
      currSortValue: "date-normal" ,
      openCate: false,
      openSort: false,
      currCate: "All"
    }

    sortName = [{text:"date: latest", value: "date-reverse"},
                {text:"date: oldest", value: "date-normal"},
                {text:"vote score: high", value: "score-decrease"},
                {text:"vote score: low", value: "score-increase"}]

    componentDidMount () {
      this.props.fetch()
    }

    toggleCate =()=> {
      this.setState({
        openCate: !this.state.openCate
      });
    }

    toggleSort = ()=> {
      this.setState({
        openSort: !this.state.openSort
      }
        )
    }

    setCateName = (evt) => {
      this.setState({currCate: evt.target.name})
    }

    clickHandler = (evt) => {
      evt.preventDefault()
      this.setState({currSortName: evt.target.name})
      const v = evt.target.value
      this.setState({currSortValue:v})
      this.props.sortBy(v)
    }

    renderDropDownItem = (item,index) => (
      <Link to={`/${item.path}`} key={index+1}
       className="dropdown-link">
        <DropdownItem
         className="dropdown-item"
         onClick={this.setCateName}
         name={item.name}
         >
          {item.name}
        </DropdownItem>
      </Link>
    )

    render() {
        const catList = this.props.category.categories
        return(
            <div className='sidebar-container'>
              <Form className='select-form'>
                <FormGroup>
                  <Label>Category:</Label>
                  <ButtonDropdown isOpen={this.state.openCate}
                   toggle={this.toggleCate}
                   className="dropdown-container">
                    <DropdownToggle caret className="dropdown-caret" outline color="dark">
                      {this.state.currCate}
                    </DropdownToggle>
                    <DropdownMenu>
                      <Link to="/" key={0} className="dropdown-link">
                       <DropdownItem
                       onClick={this.setCateName}
                       name="All"
                       className="dropdown-item"> All </DropdownItem>
                      </Link>
                      <DropdownItem divider />
                      {catList ?
                        catList.map((item,index)=>{
                          return this.renderDropDownItem(item,index)
                        })
                        : ("")}
                    </DropdownMenu>
                  </ButtonDropdown>
                </FormGroup>
                <FormGroup>
                  <Label>Sort By:</Label>
                  <ButtonDropdown isOpen={this.state.openSort}
                   toggle={this.toggleSort}
                   className="dropdown-container"
                   >
                    <DropdownToggle caret className="dropdown-caret" outline color="dark">
                      {this.state.currSortName}
                    </DropdownToggle>
                    <DropdownMenu>
                    {this.sortName.map((item,index) => (
                      <DropdownItem
                       key={index}
                       onClick={this.clickHandler}
                       name={item.text}
                       value = {item.value}
                       className="dropdown-item"
                       >
                       {item.text}
                      </DropdownItem>
                    ))}
                    </DropdownMenu>
                  </ButtonDropdown>
                  </FormGroup>
              </Form>
            </div>
        )
    }
}

export default connect((state)=>({view:state.view, category: state.category}),
                                 {sortBy: changeSort, fetch: fetchCate})(SideBar)