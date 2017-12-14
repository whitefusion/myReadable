import React, {Component} from 'react'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux'
import {fetchComment} from '../actions/'
import CommentItem from './CommentItem'

class Comment extends Component {
    componentDidMount() {
        this.props.fetch(this.props.id)
    }

    render() {
        const currComments = this.props.comment[this.props.id]
        console.log(currComments)
        return(
            <div>
                <Form id='comment-card-btn-container'>
                    <FormGroup row>
                      <Col sm="10" md={{ size: 10, offset: 1 }}>
                        <Input className='comment-input' type="textarea"
                                name="text" id="exampleText"
                                placeholder=" Your comment goes here ..."/>
                      </Col>
                    </FormGroup>
                    <Col sm="10" md={{ size: 8, offset: 2 }}>
                    <Button color='success' className='comment-submit'> submit </Button>
                    </Col>
                </Form>
                {
                    currComments ?
                    (currComments.map((c) =>
                        (<CommentItem key={c.id} content={c} />)
                    ))
                    : (<p id="no-comments"> No comments for this post. </p>)
                }
            </div>)
    }
}

export default connect((state)=>({comment:state.comment}),
                                 ({fetch:fetchComment}))(Comment);
