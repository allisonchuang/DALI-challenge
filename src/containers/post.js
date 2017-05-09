import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import marked from 'marked';
import { fetchPost, deletePost, updatePost } from '../actions';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingTitle: false,
      editingContent: false,
      editingTags: false,
      editingCover: false,
      title: '',
      content: '',
      tags: '',
      cover: '',
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderCover = this.renderCover.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  // got from http://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
  formatDate() {
    const weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';
    const date = new Date(this.props.post.created_at);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return `${weekday[date.getDay()]}, ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}  ${strTime}`;
  }

  renderTitle(title) {
    if (!this.state.editingTitle) {
      if (title === '') {
        return (
          <button type="empty-title" onClick={() => { this.setState({ editingTitle: true, title: this.props.post.title }); }}>Click to add title</button>
        );
      } else {
        return (
          <button type="full-post-title" onClick={() => { this.setState({ editingTitle: true, title: this.props.post.title }); }}>{title}</button>
        );
      }
    } else {
      return (
        <input className="title-edit" maxLength={286} autoFocus onBlur={() => {
          this.setState({ editingTitle: false });
          const post = { id: this.props.match.params.postID, title: this.state.title };
          this.props.updatePost(post);
        }}
          defaultValue={title} onChange={
          (event) => { this.state.title = event.target.value; }
        }
        />
      );
    }
  }

  renderTags(tags) {
    if (!this.state.editingTags) {
      if (tags === '') {
        return <button type="empty-tags" onClick={() => { this.setState({ editingTags: true, tags: this.props.post.tags }); }}>Click to add tags</button>;
      } else {
        return (
          <button type="full-post-tags" onClick={() => { this.setState({ editingTags: true, tags: this.props.post.tags }); }}>{tags}</button>
        );
      }
    } else {
      return (
        <input className="tags-edit" autoFocus onBlur={() => {
          this.setState({ editingTags: false });
          const post = { id: this.props.match.params.postID, tags: this.state.tags };
          this.props.updatePost(post);
        }}
          defaultValue={tags} onChange={
          (event) => { this.state.tags = event.target.value; }
        }
        />
      );
    }
  }

  renderContent(content) {
    if (!this.state.editingContent) {
      if (content === '') {
        return (<button type="full-post-content" onClick={() => { this.setState({ editingContent: true, content: this.props.post.content }); }}>
          <div className="empty-content" dangerouslySetInnerHTML={{ __html: marked('Click to add content' || '') }} />
        </button>);
      } else {
        return (
          <button type="full-post-content" onClick={() => { this.setState({ editingContent: true, content: this.props.post.content }); }}>
            <div className="full-post-content" dangerouslySetInnerHTML={{ __html: marked(content || '') }} />
          </button>
        );
      }
    } else {
      return (
        <textarea className="content-edit" autoFocus onBlur={() => {
          this.setState({ editingContent: false });
          const post = { id: this.props.match.params.postID, content: this.state.content };
          this.props.updatePost(post);
        }}
          defaultValue={content} onChange={
          (event) => { this.state.content = event.target.value; }
        }
        />
      );
    }
  }

  renderCover(cover) {
    if (!this.state.editingCover) {
      if (cover === '') {
        return <button type="empty-cover" onClick={() => { this.setState({ editingCover: true, cover: this.props.post.cover_url }); }}>Click to add cover url</button>;
      } else {
        return (
          <button type="image" onClick={() => { this.setState({ editingCover: true, cover: this.props.post.cover_url }); }}>
            <img src={this.props.post.cover_url} alt={this.props.post.title} />
          </button>
        );
      }
    } else {
      return (
        <input className="cover-edit" autoFocus onBlur={() => {
          this.setState({ editingCover: false });
          const post = { id: this.props.match.params.postID, cover_url: this.state.cover };
          this.props.updatePost(post);
        }}
          defaultValue={cover} onChange={
          (event) => { this.state.cover = event.target.value; }
        }
        />
      );
    }
  }

  render() {
    if (this.props.post == null || this.props.post._id !== this.props.match.params.postID) {
      return (
        <div>Loading...</div>
      );
    } else {
      return (
        <div className="post-page">
          <div className="top-bar">
            <button type="back-button" onClick={() => { this.props.deletePost(null, this.props.history); }}>Back to Index</button>
            <button type="delete-button" onClick={() => { this.props.deletePost(this.props.match.params.postID, this.props.history); }}>Delete</button>
          </div>
          <div className="full-post">
            {this.renderCover(this.props.post.cover_url)}
            <div className="full-post-info">
              {this.renderTitle(this.props.post.title)}
              <div className="date">{this.formatDate()}</div>
              {this.renderContent(this.props.post.content)}
              {this.renderTags(this.props.post.tags)}
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => (
  {
    post: state.posts.post,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchPost: id => dispatch(fetchPost(id)),
    deletePost: (id, history) => dispatch(deletePost(id, history)),
    updatePost: post => dispatch(updatePost(post)),
  }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
