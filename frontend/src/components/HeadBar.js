import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  Label } from 'reactstrap';

export const HeadBar = () => {
  return (
      <div id="headbar">
        <Navbar color="faded" light expand="sm">
          <NavbarBrand href="/" id="headbar-title">Readable</NavbarBrand>
        </Navbar>
      </div>
  )
}