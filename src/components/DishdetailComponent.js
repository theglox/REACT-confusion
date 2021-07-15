import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Button,Modal, ModalHeader, ModalBody,Row,Col,Label,} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

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
       this.toggleModal();
       this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
      
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
                                    <Control.select model=".rating" name="Rating"className="form-control">
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
                                <Control.text model=".author" id="CommentName" name="CommentName"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
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
                                    <Control.textarea model=".comment" id="message" name="message" 
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
    function RenderDish({dish}){
  
            return(

                <div className="col-12 col-md-5 m-1">
                 <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                        <Card>
                            
                            {/* busca la imagen directamente desde el servidor */}

                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                        </FadeTransform>   
                </div>   
            ); 
      
    }
    function RenderComments({comments, addComment, dishId}) {

        if (comments != null) 
         return(

             <div className="col-12 col-md-5 m-1 ">
 
             <Fade in>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                {comments.map((comment)=>{
                    return(
                        <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>--{comment.author},{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: '2-digit'}).format(new Date(comment.date))}</p>
                        </li>
                    );
                })}
                </ul>
                </Fade>
                <CommentForm dishId={dishId} addComment={addComment} />

               
            </div>
            
         );
        else
           return(
                 <div></div> 
          );
    }

    const DishDetail = (props) =>{
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) {
            return(
                <div class="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>    
                </div>
                    <div class="row">
                         <RenderDish dish ={props.dish}/>
                         
                         <RenderComments comments={props.comments}
                         addComment={props.addComment}
                         dishId={props.dish.id}
                         />
                    </div>

                </div>
               
            );
        }
        else 
            return(
                <div></div>
            );
    }


export default DishDetail;