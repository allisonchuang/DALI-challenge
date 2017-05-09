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
    this.formatDate = this.formatDate.bind(this);
    this.mapPosts = this.mapPosts.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  // got from http://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
  formatDate(d) {
    this.state = {};
    const weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';
    const date = new Date(d);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return `${weekday[date.getDay()]}, ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}  ${strTime}`;
  }

  mapPosts() {
    if (this.props.posts != null) {
      const postItems = this.props.posts.map((post) => {
        return (
          <div className="post-layout" key={post.id}>
            <button type="post-click" onClick={() => { this.props.goToPost(post.id, this.props.history); }}>
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
    goToPost: (id, history) => dispatch(goToPost(id, history)),
  }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));
