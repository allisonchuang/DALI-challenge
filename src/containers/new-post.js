import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, BrowserRouter as NavLink } from 'react-router-dom';
import { createPost } from '../actions';

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      tags: '',
      content: '',
      cover_url: '',
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onCoverChange = this.onCoverChange.bind(this);
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value });
  }
  onTagsChange(event) {
    this.setState({ tags: event.target.value });
  }
  onContentChange(event) {
    this.setState({ content: event.target.value });
  }
  onCoverChange(event) {
    this.setState({ cover_url: event.target.value });
  }

  render() {
    return (
      <div className="new-post-page">
        <div className="new-inputs">
          <div className="create-title">Create a New Post</div>
          <input className="create" maxLength={20} placeholder="title" value={this.state.title} onChange={this.onTitleChange} />
          <input className="create" placeholder="tags" value={this.state.tags} onChange={this.onTagsChange} />
          <input className="create" placeholder="content" value={this.state.content} onChange={this.onContentChange} />
          <input className="create" placeholder="cover_url" value={this.state.cover_url} onChange={this.onCoverChange} />
          <div className="create-buttons">
            <NavLink to="/posts/"><button type="create" id="submit" disabled={this.state.title === '' && this.state.tags === '' && this.state.content === '' && this.state.cover_url === ''}
              onClick={() => {
                const fields = { title: this.state.title, tags: this.state.tags, content: this.state.content, cover_url: this.state.cover_url };
                this.props.createPost(
                fields,
                this.props.history);
                this.setState({
                  title: '',
                  tags: '',
                  content: '',
                  cover_url: '',
                });
              }}
            >Submit</button></NavLink>
            <button type="create" id="cancel" onClick={() => { this.props.createPost(null, this.props.history); }}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  {
    createPost: (post, history) => dispatch(createPost(post, history)),
  }
);


export default withRouter(connect(null, mapDispatchToProps)(NewPost));
