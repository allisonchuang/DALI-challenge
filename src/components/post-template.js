import React from 'react';
import '../style.scss';

const PostTemplate = (props) => {
  return (
    <div className="post">
      <div className="image">
        <img src={props.post.cover_url} alt={props.post.title} />
      </div>
      <div className="post-info">
        <div className="title">{props.post.title}</div>
        <div className="tags">{props.post.tags}</div>
        <div className="post-date">{props.formatDate(props.post.created_at)}</div>
      </div>
    </div>
  );
};

export default PostTemplate;
