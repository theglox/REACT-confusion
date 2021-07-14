import React, { Component } from 'react';
import { Button,Modal, ModalHeader, ModalBody,Row,Col,Label,} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
                isModalOpen: false
            };
        this.toggleModal = this.toggleModal.bind(this);
      }
    toggleModal() {
    this.setState({
        isModalOpen: !this.state.isModalOpen
    });
    }
    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
      
    }

    render(){
        return(
            <div>
            <Button outline onClick={this.toggleModal}>
                <span className=" fa fa-comment "> Submit Comment</span>
             </Button> 
   
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}> 
                    <ModalHeader toggle={this.toggleModal} >Submit Comment</ModalHeader>
                    <ModalBody>
                        <Row className="form-group">
                                <Col >
                                    <Label htmlFor="RatingLabel">Rating</Label>
                                    <Control.select model=".Rating" name="Rating"className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                        </Row>
                        <Row className="form-group"> 
                            <Col>
                                <Label htmlFor="NameLabel">Your Name</Label>
                                <Control.text model=".Name" id="CommentName" name="CommentName"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".Name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                              <Label htmlFor="CommentLabel"> Comment</Label>
                                    <Control.textarea model=".message" id="message" name="message" 
                                     rows="6"
                                     className="form-control"
                                    />

                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                            </Col>
                        </Row>
                    </ModalBody>
                    </LocalForm>
                </Modal>


            </div>
        );
    } 
}   
export default CommentForm;   