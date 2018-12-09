import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../actions/postActions';
import {Link} from 'react-router-dom'
import Spinner from '../common/Spinner';
import PostItem from '../posts/PostItem';
class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;
    let postContent;
    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showAction={false}/>
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb3">
                Back To Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>

    );
  }
}
const mapStateToProps = (state) => ({});
export default mapStateToProps(Post);
