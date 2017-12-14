import React, {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import PostModal from './PostModal'

class HeadBar extends Component {

  state = {
    isOpen : false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  renderDropDown = () => (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">Readable</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                  Categories
                </DropdownToggle>
                <DropdownMenu >
                  <DropdownItem key={0}>
                    All
                  </DropdownItem>
                  <DropdownItem divider />
                  {
                    this.props.catList ?
                    this.props.catList.map((c,index) => (<DropdownItem key={index}>{c.name}</DropdownItem>))
                    : ('')
                  }
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <PostModal name="Add" title = "New post"
                content={{}} />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
  )

  render() {
    return (
      this.renderDropDown()
    );
  }
}

export default HeadBar
