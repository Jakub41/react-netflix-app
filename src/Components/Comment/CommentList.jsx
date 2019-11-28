import React, {Component} from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";
import {Card} from "reactstrap";

class CommentList extends Component {
  render() {
    const {comments, onFetch, onShowErrorMessage} = this.props;

    return comments.length > 0 ? (
      <Card>
        <div className="comment">
          <h1 style={{marginLeft: 10}}>User reviews</h1>
          {comments.map(comment => (
            <Comment
              key={comment._id}
              data={comment}
              onFetch={onFetch}
              onShowErrorMessage={onShowErrorMessage}
            />
          ))}
        </div>
      </Card>
    ) : (
      <h3 className="red-text">No Reviews yet, be the first to leave a comment</h3>
    );
  }
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      elementId: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    })
  ),
  onFetch: PropTypes.func.isRequired,
  onShowErrorMessage: PropTypes.func.isRequired,
};

export default CommentList;
