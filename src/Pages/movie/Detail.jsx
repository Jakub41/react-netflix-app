import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  CardImg,
  CardBody,
  CardTitle,
  CardFooter,
  Button,
  Input,
  FormGroup,
  Label,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
import CommentList from "../../Components/Comment/CommentList";
import Loading from "../../Components/Loading";
import Error from "../../Components/Alert/Error";
import CommentApi from "../../Apis/CommentApi";
import InfoMessage from "../../Components/Alert/InfoMessage";
import MovieDetails from "./partials/MovieDetails";
import {ratings} from "../../Utils/utilsConst";
import {CardHeader} from "semantic-ui-react";

class DetailMovie extends React.Component {
  state = {
    comments: [],
    comment: "",
    rate: 1,
    disabled: true,
    hasErrors: false,
    loading: false,
    message: "There is an issue to fetch data from server. Please try again later.",
    info: false,
    infoMessage: "The comment is added successfully",
    modal: false,
  };

  async componentDidMount() {
    await this.onFetchComments();
  }

  onFetchComments = async () => {
    this.setState({loading: true});
    try {
      const commentApi = new CommentApi();
      const data = await commentApi.getAllComments(this.props.match.params.imdbID);
      if (!data.success) {
        this.onShowErrorMessage();
      } else {
        this.setState({
          comments: data.data,
          loading: false,
        });
      }
    } catch (err) {
      console.log("onFetchComments err: ", err);
      this.onShowErrorMessage();
    }
  };

  toggle = () => {
    const {modal} = this.state;
    this.setState({modal: !modal});
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      disabled: e.target.value === "",
    });
  };

  onSubmit = async () => {
    const {comment, rate} = this.state;
    if (comment === "") {
      return;
    }

    this.setState({loading: true, modal: false});
    try {
      const commentApi = new CommentApi();
      const body = {
        comment,
        rate,
        elementId: this.props.match.params.imdbID,
      };
      const data = await commentApi.addComment(body);
      if (!data.success) {
        this.onShowErrorMessage();
      } else {
        await this.onFetchComments();
        this.setState({
          comment: "",
          disabled: true,
          loading: false,
          info: true,
          infoMessage: "The comment is added successfully",
        });
        setTimeout(this.onClearMessage, 2000);
      }
    } catch (err) {
      console.log("onSubmit err: ", err);
      this.onShowErrorMessage();
    }
  };

  onShowErrorMessage = () => {
    this.setState({hasErrors: true, loading: false});
    setTimeout(this.onClearMessage, 5000);
  };

  onClearMessage = () => {
    this.setState({hasErrors: false, info: false});
  };

  getReviewModal = () => {
    const {modal, comment, rate} = this.state;
    return (
      <Modal isOpen={modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Add Review</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="comment">Comment</Label>
            <Input
              id="comment"
              type="text"
              name="comment"
              placeholder="Type comment"
              onChange={this.onChange}
              value={comment}
            />
          </FormGroup>
          <FormGroup>
            <Label for="rate">Rate(Out of 5)</Label>
            <Input
              type="select"
              name="rate"
              value={rate}
              onChange={this.onChange}
              style={{width: 200}}
            >
              {ratings.map((rating, i) => (
                <option key={i}>{rating}</option>
              ))}
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={!rate || !comment} onClick={this.onSubmit}>
            Submit
          </Button>
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  getAverageRating = () => {
    const {comments} = this.state;

    let rating = 0;

    comments.length > 0 &&
      comments.map(comment => {
        rating += parseInt(comment.rate);
      });
    const averageRating = rating / comments.length;
    return averageRating;
  };

  render() {
    const {data} = this.props.history.location.state;
    const {comments, loading, hasErrors, message, info, infoMessage} = this.state;
    if (!data) {
      return null;
    }
    const reviewModal = this.getReviewModal();
    const averageRating = this.getAverageRating();
    return (
      <Container className="detail-container">
        {hasErrors && <Error message={message} />}
        {loading && <Loading />}
        <Card className="flex-row flex-wrap">
          <CardHeader className="border-0 col-4 mt-4">
            <CardImg className="movie-image" src={data.Poster} top />
            <div className="rating mt-4">
              {averageRating ? averageRating.toFixed(1) : 0}
            </div>
            <div className="text-primary" style={{fontSize: 30}}>
              {comments.length} votes
            </div>
          </CardHeader>
          <CardBody className="px-2 col-8">
            <MovieDetails movieID={data.imdbID} />
          </CardBody>
          <CardFooter className="w-100">
            <Button color="success" onClick={this.toggle}>
              Review It
            </Button>
          </CardFooter>
        </Card>
        {reviewModal}
        {info && <InfoMessage message={infoMessage} />}

        <CommentList
          comments={comments}
          onFetch={this.onFetchComments}
          onShowErrorMessage={this.onShowErrorMessage}
        />
      </Container>
    );
  }
}

DetailMovie.propTypes = {
  history: PropTypes.any,
  match: PropTypes.shape({
    params: PropTypes.shape({
      imdbID: PropTypes.string.isRequired,
    }),
  }),
};

export default DetailMovie;
