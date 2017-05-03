import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPosts, goToPost } from '../actions';
import PostTemplate from '../components/post-template';

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.componentDidMount = this.componentDidMount.bind(this);
    this.mapPosts = this.mapPosts.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  mapPosts() {
    if (this.props.posts != null) {
      const postItems = this.props.posts.map((post) => {
        return (
          <div className="post-layout" key={post.id}>
            <button type="post-click" onClick={() => { this.props.goToPost(post.id, this.props.history); }}>
              <PostTemplate post={post} id={post.id} />
            </button>
          </div>
        );
      });
      return (
        <div className="page">
          {postItems}
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
  render() {
    return (
      <div>
        {this.mapPosts()}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    posts: state.posts.all,
    post: state.posts.post,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchPosts: () => dispatch(fetchPosts()),
    goToPost: (id, history) => dispatch(goToPost(id, history)),
  }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));
