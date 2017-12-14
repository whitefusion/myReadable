import React,{Component} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,
        Form, FormGroup, Label,Input, Col} from 'reactstrap';

class PostModal extends Component {
  state = {
      modal: false
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const p = this.props.content
    return (
      <div >
        <Button color="primary" size='sm' className='button' onClick={this.toggle}>{this.props.name}</Button>
        <Modal size='lg' id="edit-modal" isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <Form >
          <Col sm={11}>
            <FormGroup>
              <Label for="post-title">Title</Label>
              <Input type='text' name="post-title"
                     defaultValue={p ? p.title : ' '} placeholder="post title" />
            </FormGroup>
            <FormGroup>
              <Label for="post-author">Author</Label>
              <Input type="text" name="post-author"
                     defaultValue={p ? p.author : ' '} placeholder="post author"/>
            </FormGroup>
            <FormGroup>
              <Label for="post-body">Body</Label>
              <Input id="post-body" type="textarea"
                     rows="8" name="text"
                     defaultValue={p ? p.body : ' '} placeholder="post content"/>
            </FormGroup>
            </Col>
          </Form>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}> Submit </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default PostModal;