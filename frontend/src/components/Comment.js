import React, {Component} from 'react'
import {Alert, Col, Row, Button, Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux'
import {fetchComment, createComment} from '../actions/'
import CommentItem from './CommentItem'
import {generateCommentId} from '../utils/utility'

class Comment extends Component {

    state = {
        message: "",
        alert: false,
        currCommnet: '',
        currAuthor: ''
    }

    componentDidMount() {
        this.props.fetch(this.props.id)
    }

    handleChange = (evt) => {
        const v = evt.target.value
        const t = evt.target.name
        switch(t) {
            case "comment-author":
                this.setState({currAuthor: v})
                return
            case "comment-body":
                this.setState({currComment: v})
                return
            default:
                return
        }
    }

    showAlert = () => {
        const base = " cannot be empty !"
        let msg=""
        if(this.state.currComment==="")
          msg="Comment body" + base
        else if(this.state.currAuthor==="")
          msg="Author"+base
        this.setState({alert:true,message:msg})
        setTimeout(()=>{this.setState({alert:false,message:""})},5000)
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        if(this.state.currAuthor && this.state.currComment){
            const tempId = generateCommentId()
            this.props.add({
                id:tempId,
                parentId: this.props.id,
                timestamp: Date.now(),
                author: this.state.currAuthor,
                body: this.state.currComment
            })
            this.clearState()
        } else {
            this.showAlert();
        }

    }

    clearState = () => {
        this.setState({currAuthor: ''})
        this.setState({currComment: ''})
    }

    render() {
        const allComments = this.props.comment[this.props.id]
        const validComments = allComments ? allComments.filter((c) => !c.deleted):[]
        return(
            <div>
                <Form id='comment-card-btn-container'>
                    <Alert className="alert" color="danger" isOpen={this.state.alert}>{this.state.message}</Alert>
                    <FormGroup row className='comment-input-container'>
                      <Col sm="10" md={{ size: 10, offset: 1 }}>
                        <Input className='comment-input' type="textarea"
                                name="comment-body"
                                bsSize="sm"
                                value={this.state.currComment}
                                onChange={this.handleChange}
                                placeholder="Your comment goes here"/>
                      </Col>
                    </FormGroup>
                    <FormGroup row className='comment-author-container'>
                      <Col md={{ size: 10, offset: 1 }}>
                        <Row>
                        <Col md="5">
                        <Input className='comment-author'
                                name="comment-author"
                                bsSize="sm"
                                value={this.state.currAuthor}
                                onChange={this.handleChange}
                                placeholder='Author'/>
                        </Col>
                        <Col md="3">
                        <Button color='success' className='comment-submit' onClick={this.handleSubmit}> submit </Button>
                        </Col>
                        </Row>
                      </Col>
                    </FormGroup>
                </Form>
                {
                    validComments.length ?
                    (validComments.map((c) =>
                        (<CommentItem key={c.id} content={c} />)
                    ))
                    : (<p id="no-comments"> No comments for this post. </p>)
                }
            </div>)
    }
}

export default connect((state)=>({comment:state.comment}),
                                 ({fetch:fetchComment,add:createComment}))(Comment);
