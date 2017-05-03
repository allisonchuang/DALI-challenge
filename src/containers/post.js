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
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  renderTitle(title) {
    if (!this.state.editingTitle) {
      return (
        <button type="full-post-title" onClick={() => { this.setState({ editingTitle: true }); }}>{title}</button>
      );
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
      return (
        <button type="full-post-tags" onClick={() => { this.setState({ editingTags: true }); }}>{tags}</button>
      );
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
      return (
        <button type="full-post-content" onClick={() => { this.setState({ editingContent: true }); }}>
          <div className="full-post-content" dangerouslySetInnerHTML={{ __html: marked(content || '') }} />
        </button>
      );
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
      return (
        <button type="image" onClick={() => { this.setState({ editingCover: true }); }}>
          <img src={this.props.post.cover_url} alt={this.props.post.title} />
        </button>
      );
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
