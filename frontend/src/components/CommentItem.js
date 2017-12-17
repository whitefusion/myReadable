import React, {Component} from 'react'
import {ListGroupItem, Button,Modal, ModalHeader, ModalBody, ModalFooter ,
        Form, FormGroup, Label,Input, Col} from 'reactstrap'
import {updateComment,saveRemoveComment} from '../actions'
import { connect } from 'react-redux'
import { getDate } from '../utils/utility.js'

class CommentItem extends Component {
    c = this.props.content

    state = {
      modal: false,
      currComment: this.c ? this.c.body:'',
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    }

    handleChange = (evt) => {
        const v = evt.target.value
        const t = evt.target.name
        switch(t) {
            case "comment-body":
                this.setState({currComment: v})
                return
            default:
                return
        }
    }

    handleClick = (evt) => {
      evt.preventDefault()
      this.props.edit({
        id:this.c.id,
        body:this.state.currComment,
        parentId:this.c.parentId
      })
      this.toggle()
    }

    handleDelete = (evt) => {
      evt.preventDefault()
      this.props.remove(this.c.id,this.c.parentId)
    }

    render () {
        const c = this.c
        return (
            <ListGroupItem>
                <p id="comment-body">{c.author} : {c.body} </p>
                <p id="comment-date">- {getDate(c.timestamp)}</p>
                <div className="comment-btn-container">
                <Button className='comment-btn' color="danger" onClick={this.handleDelete}>delete</Button>
                <Button color="primary" className='comment-btn' onClick={this.toggle}>edit</Button>
                </div>
                  <div >
                    <Modal size='lg' id="edit-modal" isOpen={this.state.modal} toggle={this.toggle} >
                      <ModalHeader toggle={this.toggle}>Edit Comment</ModalHeader>
                      <Form >
                      <Col sm={11}>
                        <FormGroup>
                          <Label >Body</Label>
                          <Input type="textarea"
                                 rows="3" name="comment-body"
                                 value={this.state.currComment}
                                 onChange={this.handleChange}/>
                        </FormGroup>
                      </Col>
                      </Form>
                      <ModalFooter>
                        <Button color='success' onClick={this.handleClick}> Submit </Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                  </div>
            </ListGroupItem>
        )
    }
}

export default connect((state)=>({comment:state.comment}),
                                 ({edit: updateComment, remove: saveRemoveComment }))(CommentItem);