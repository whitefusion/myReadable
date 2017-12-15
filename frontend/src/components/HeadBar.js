import React, {Component} from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  Label } from 'reactstrap';
import CategorySelect from './CategorySelect'

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
      <div id="headbar">
        <Navbar color="faded" light expand="sm">
          <NavbarBrand href="/" id="headbar-title">Readable</NavbarBrand>
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
