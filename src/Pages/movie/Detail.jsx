import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  CardImg,
  CardTitle,
  CardBody,
  Button,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import CommentList from "../../Components/Comment/CommentList";
import Loading from "../../Components/Loading";
import Error from "../../Components/Alert/Error";
import CommentApi from "../../Apis/CommentApi";
import InfoMessage from "../../Components/Alert/InfoMessage";
import MovieDetails from "./partials/MovieDetails"

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

    this.setState({loading: true});
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

  render() {
    const {data} = this.props.history.location.state;
    const {
      comments,
      comment,
      rate,
      disabled,
      loading,
      hasErrors,
      message,
      info,
      infoMessage,
    } = this.state;
    if (!data) {
      return (<div>No information fetched</div>);
    }
    return (
      <Container className="mt-2 mb-4">
        {hasErrors && <Error message={message} />}
        {loading && <Loading />}
        <Row>
          {/* <Col className="col-3" /> */}

          <Col className="col-6 mt-3">
            <div className="mx-2 movie-item">
              <CardImg className="movie-image" src={data.Poster} top />
              <CardBody>
                <CardTitle>{data.Title}</CardTitle>
              </CardBody>
            </div>
          </Col>
          <Col className="col-6 mt-3">
            <MovieDetails movieID={data.imdbID} />
          </Col>
        </Row>
        {info && <InfoMessage message={infoMessage} />}
        <Row className="mt-2">
          <div className="col-12 mt-3">
            <FormGroup className="col-3 mt-3">
              <Label for="rate">Rate</Label>
              <Input
                type="select"
                name="rate"
                id="rate"
                value={rate}
                onChange={this.onChange}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
            </FormGroup>
            <FormGroup className="col-6 mt-3">
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
            <FormGroup className="col-6 mt-3">
              <Button color="primary" disabled={disabled} onClick={this.onSubmit}>
                Comment
              </Button>
            </FormGroup>
          </div>
        </Row>

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
