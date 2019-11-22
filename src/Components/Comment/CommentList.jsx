import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'

class CommentList extends Component {
  render () {
    const { comments, onFetch, onShowErrorMessage } = this.props
    if (!comments || comments.length === 0) {
      return null
    }
    const commentList = comments.map(comment => {
      return <Comment key={comment._id} data={comment} onFetch={onFetch} onShowErrorMessage={onShowErrorMessage} />
    })
    return (
      <div>
        {commentList}
      </div>
    )
  }
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    elementId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  })),
  onFetch: PropTypes.func.isRequired,
  onShowErrorMessage: PropTypes.func.isRequired
}

export default CommentList
