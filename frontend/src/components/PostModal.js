import React,{Component} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,
        Form, FormGroup, Label,Input, Col} from 'reactstrap';
import CategorySelect from './CategorySelect'
import {createPost} from '../actions'
import {connect} from 'react-redux'
import {generateId,generateCommentId} from '../utils/utility'
import {Route, Switch, Link} from 'react-router-dom'
import { Alert } from 'reactstrap';

class PostModal extends Component {
  p = this.props.content
  state = {
      modal: false,
      alert: false,
      message:"",
      currTitle: this.p ? this.p.title : '',
      currAuthor: this.p ? this.p.author : '',
      currCategory: this.p ? this.p.category : '',
      currBody: this.p ? this.p.body : ''
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  showAlert = () => {
    const base = " cannot be empty !"
    let msg=""
    if(this.state.currTitle==="")
      msg="Title" + base
    else if(this.state.currAuthor==="")
      msg="Author"+base
    else if(this.state.currBody==="")
      msg="Body"+base
    this.setState({alert:true,message:msg})
    setTimeout(()=>{this.setState({alert:false,message:""})},5000)
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    if(this.state.currAuthor &&
      this.state.currBody &&
      this.state.currTitle){
      this.toggle()
      const id = generateId()
      const currPost = {
        author: this.state.currAuthor,
        body: this.state.currBody,
        category: this.state.currCategory,
        title: this.state.currTitle,
        id,
        timestamp:Date.now()
      }
      this.props.create(currPost)
    } else {
      this.showAlert()
    }
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


  renderModal = () => (
      <Modal size='lg' id="edit-modal" isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <Form >
          <Col sm={9} className="post-form-container">
            <FormGroup>
              <Label for="post-title">Title</Label>
              <Input type='text' name="post-title"
                     value={this.state.currTitle}
                     placeholder="post title"
                     onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="post-author">Author</Label>
              <Input type="text" name="post-author"
                     value={this.state.currAuthor}
                     placeholder="post author"
                     onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="post-category">Category</Label>
              <Input className="category-select"
                type="select" name="post-category"
                id="selectCategory"
                value={this.state.currCategory}
                onChange={this.handleChange}>
                {this.props.catList ?
                 this.props.catList.map((c,index) => (<option value={c.name} key={index+1}>{c.name}</option>))
                : ('')}
            </Input>
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
          <Alert color="danger" isOpen={this.state.alert}>{this.state.message}</Alert>
          <ModalFooter>
            <Button color='success' onClick={ this.handleSubmit}> Submit </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
  )

renderAddButton = () =>(
    <div className="new-post-btn-container">
      <Button color="primary" size="sm" className="new-post-btn" onClick={this.toggle} >"add-new-post"</Button>
    </div>
)
  render() {
    return (
      <div >
        {this.renderAddButton()}
        {this.renderModal()}
      </div>
    );
  }
}

export default connect((state)=>({post:state.post}),{create: createPost})(PostModal);