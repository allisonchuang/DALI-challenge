import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPosts, goTo } from '../actions';
import PostTemplate from '../components/post-template';

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.componentDidMount = this.componentDidMount.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.mapPosts = this.mapPosts.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  // got from http://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
  formatDate(d) {
    this.state = {};
    const date = new Date(d);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  mapPosts() {
    if (this.props.posts != null) {
      const postItems = this.props.posts.map((post) => {
        return (
          <div className="post-layout" key={post.id}>
            <button type="post-click" onClick={() => { this.props.goTo(`/post/${post.id}`, this.props.history); }}>
              <PostTemplate post={post} id={post.id} formatDate={this.formatDate} />
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
    goTo: (path, history) => dispatch(goTo(path, history)),
  }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));
