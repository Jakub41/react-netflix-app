import React, {Component} from "react";
import {Row, Input, Button, Modal, ModalBody, ModalFooter, Col} from "reactstrap";
import PropTypes from "prop-types";
import Loading from "../Loading";
import CommentApi from "../../Apis/CommentApi";
import {FaEdit} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import {MdSystemUpdateAlt, MdCancel} from "react-icons/md";
import StarRatings from "react-star-ratings";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      btnLabel: <FaEdit />,
      btnLabelDelete: <AiFillDelete />,
      rate: this.props.data.rate,
      comment: this.props.data.comment,
      author: this.props.data.author,
      disabled: true,
      submitDisable: false,
      loading: false,
      modal: false,
      deletable: true,
    };
  }

  onUpdate = async () => {
    const {edit, comment, rate} = this.state;
    if (!edit) {
      this.setState({
        edit: true,
        btnLabel: <MdSystemUpdateAlt />,
        disabled: false,
        submitDisable: true,
        btnLabelDelete: <MdCancel />,
        deletable: false,
      });
    } else {
      if (comment === "") {
        return;
      }

      this.setState({loading: true});
      try {
        const commentApi = new CommentApi();
        const body = {
          comment,
          rate,
          elementId: this.props.data.elementId,
        };
        const data = await commentApi.updateComment(this.props.data._id, body);
        if (!data.success) {
          this.props.onShowErrorMessage();
        } else {
          this.setState({
            edit: false,
            btnLabel: <FaEdit />,
            btnLabelDelete: <AiFillDelete />,
            disabled: true,
            loading: false,
            deletable: true,
          });
          this.props.onFetch();
        }
      } catch (err) {
        console.log("onUpdate err: ", err);
        this.props.onShowErrorMessage();
      }
    }
  };

  onDelete = async () => {
    const {deletable} = this.state;
    if (deletable) {
      this.onShowModal();
    } else {
      this.setState({
        btnLabel: <FaEdit />,
        btnLabelDelete: <AiFillDelete />,
        edit: false,
        submitDisable: false,
        disabled: true,
        deletable: true,
        comment: this.props.data.comment,
        rate: this.props.data.rate,
      });
    }
  };

  onChange = e => {
    const validate =
      e.target.name === "rate"
        ? e.target.value === this.props.data.rate &&
          this.state.comment === this.props.data.comment
        : e.target.value === this.props.data.comment &&
          this.state.rate === this.props.data.rate;

    this.setState({
      [e.target.name]: e.target.value,
      submitDisable: e.target.value === "" || validate,
    });
  };

  onDeleteComment = async () => {
    this.setState({loading: true, modal: false});
    try {
      const commentApi = new CommentApi();
      const data = await commentApi.deleteComment(this.props.data._id);
      if (!data.success) {
        this.props.onShowErrorMessage();
      } else {
        this.setState({loading: false});
        this.props.onFetch();
      }
    } catch (err) {
      console.log("onUpdate err: ", err);
      this.props.onShowErrorMessage();
    }
  };

  onShowModal = () => {
    this.setState(prevState => {
      return {modal: !prevState.modal};
    });
  };

  onChangeRating = newrating => {
    this.setState({rate: newrating});
  };

  render() {
    const {data} = this.props;
    if (!data) {
      return null;
    }
    const {
      comment,
      rate,
      author,
      btnLabel,
      disabled,
      btnLabelDelete,
      loading,
      submitDisable,
      modal,
      edit,
    } = this.state;

    return (
      <React.Fragment>
        {loading && <Loading />}
        <div className="comment-container">
          <h5>{author}</h5>

          <Row className="only-desktop">
            <Col sm={2} md={6}>
              <Input
                name="comment"
                id="comment"
                value={comment}
                disabled={disabled}
                onChange={this.onChange}
              />
            </Col>
            <Col sm={2}>
              <div>
                <StarRatings
                  rating={rate}
                  starRatedColor="orange"
                  starDimension="20px"
                  starSpacing="4px"
                  changeRating={edit ? this.onChangeRating : null}
                  numberOfStars={5}
                  name="rating"
                  starHoverColor="orange"
                />
              </div>
            </Col>
            <Col sm={4}>
              <Button
                color="info"
                style={{marginLeft: "5px", marginRight: "5px", borderRadius: 0}}
                onClick={this.onUpdate}
              >
                {btnLabel}
              </Button>
              <Button color="danger" style={{borderRadius: 0}} onClick={this.onDelete}>
                {btnLabelDelete}
              </Button>
            </Col>
          </Row>
          <div className="only-mobile">
            <Input
              name="comment"
              id="comment"
              value={comment}
              disabled={disabled}
              onChange={this.onChange}
            />
            <div className="flex space-between mt-2">
              <StarRatings
                rating={rate}
                starRatedColor="orange"
                numberOfStars={5}
                name="rating"
              />
              <div>
                <Button
                  color="info"
                  style={{marginLeft: "5px", marginRight: "5px", borderRadius: 0}}
                  onClick={this.onUpdate}
                  disabled={submitDisable}
                >
                  {btnLabel}
                </Button>
                <Button color="danger" style={{borderRadius: 0}} onClick={this.onDelete}>
                  {btnLabelDelete}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Modal isOpen={modal} toggle={this.onShowModal}>
          <ModalBody>Are you sure to delete this comment?</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onDeleteComment}>
              Delete
            </Button>{" "}
            <Button color="secondary" onClick={this.onShowModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

Comment.propTypes = {
  onShowErrorMessage: PropTypes.func,
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    elementId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }),
  onFetch: PropTypes.func,
};

export default Comment;
