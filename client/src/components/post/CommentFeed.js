import React, { Component } from 'react';

class CommentFeed extends Component {
  render() {
    const { comments, postId } = this.props;
    return comments.map((comment) => (
      <CommentId key={comment._id} comment={comment} postId={postId} />
    ));
  }
}
export default CommentFeed;
