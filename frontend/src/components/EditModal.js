import React,{Component} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,
        Form, FormGroup, Label,Input, Col} from 'reactstrap';
import CategorySelect from './CategorySelect'
import {updatePost} from '../actions'
import {connect} from 'react-redux'

class EditModal extends Component {
  p = this.props.content
  state = {
      modal: false,
      currTitle: this.p ? this.p.title : '',
      currBody: this.p ? this.p.body : ''
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const updatedPost = {
      body: this.state.currBody,
      title: this.state.currTitle,
      id:this.p.id,
    }
    this.props.edit(updatedPost)
    this.toggle()
  }

  handleChange = (evt) => {
    const val = evt.target.value
    switch(evt.target.name) {
      case "post-title":
        this.setState({currTitle: val})
        return;
      case "post-author":
        this.setState({currAuthor:val})
        return;
      case "post-category":
        this.setState({currCategory:val})
        return;
      case "post-body":
        this.setState({currBody:val})
        return;
      default:
        return;
    }
  }

  render() {

    return (
      <div >
        <div className={this.props.btnBlockCls}>
        <Button color="primary" size="sm" className={this.props.btnClass} onClick={this.toggle}>{this.props.name}</Button>
        </div>
        <Modal size='lg' id="edit-modal" isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <Form >
          <Col sm={9}>
            <FormGroup>
              <Label for="post-title">Title</Label>
              <Input type='text' name="post-title"
                     value={this.state.currTitle}
                     placeholder="post title"
                     onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="post-body">Body</Label>
              <Input name="post-body" type="textarea"
                     rows="8"
                     value={this.state.currBody}
                     placeholder="post content"
                     onChange={this.handleChange}/>
            </FormGroup>

            </Col>
          </Form>
          <ModalFooter>
            <Button color='success' onClick={ this.handleSubmit}> Submit </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect((state)=>({post:state.post}),{edit: updatePost})(EditModal);