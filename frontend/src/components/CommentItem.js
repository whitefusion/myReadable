import React, {Component} from 'react'
import {ListGroupItem, Button,Modal, ModalHeader, ModalBody, ModalFooter ,
        Form, FormGroup, Label,Input, Col} from 'reactstrap'

class CommentItem extends Component {
    state = {
      modal: false
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    }

    render () {
        const c = this.props.content
        return (
            <ListGroupItem>
                <div id="comment-body">{c.author} : {c.body}</div>
                <Button className='comment-btn' color="danger">delete</Button>
                <Button color="primary" className='comment-btn' onClick={this.toggle}>edit</Button>
                  <div >
                    <Modal size='lg' id="edit-modal" isOpen={this.state.modal} toggle={this.toggle} >
                      <ModalHeader toggle={this.toggle}>Edit Comment</ModalHeader>
                      <Form >
                      <Col sm={11}>
                        <FormGroup>
                          <Label for="post-author">Author</Label>
                          <Input type="text" name="post-author"
                                 defaultValue={c ? c.author : ' '} placeholder="post author"/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="post-body">Body</Label>
                          <Input id="post-body" type="textarea"
                                 rows="3" name="text"
                                 defaultValue={c ? c.body : ' '} placeholder="post content"/>
                        </FormGroup>
                      </Col>
                      </Form>
                      <ModalFooter>
                        <Button color='success' onClick={this.toggle}> Submit </Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                  </div>
            </ListGroupItem>
        )
    }
}

export default CommentItem