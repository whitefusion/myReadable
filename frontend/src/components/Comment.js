import React, {Component} from 'react'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux'

class Comment extends Component {

    render() {
        return(
            <div>
                <Form className='comment'>
                    <FormGroup row className='comment-form'>
                      <Col sm={10}>
                        <Input className='comment-input' type="textarea"
                                name="text" id="exampleText"
                                placeholder="Your comment goes here ..."/>
                      </Col>
                    </FormGroup>
                    <Col sm={10}>
                    <Button color='success' className='comment-submit'> submit </Button>
                    </Col>
                </Form>
            </div>)
    }
}

export default connect((state)=>({comment:state.comment}))(Comment);
