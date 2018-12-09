import React, { Component } from 'react'
import {deleteComment} from '../../actions/postActions'
import {connect} from 'react-router-dom';
class CommentItem extends Component {
  render() {
    const {comment,postId,auth} = this.props;
    return (
      <div>
        
      </div>
    )
  }
}
const deleteComment = state =>({
  auth: state.auth
})
export default connect(mapPropsToState,{deleteComment})(CommentItem)