import React from 'react';
import '../style.scss';


// template for all of the DALI members
const MemberTemplate = (props) => {
  return (
    <div className="member">
      <div className="image">
        <img src={`http://mappy.dali.dartmouth.edu/${props.member.iconUrl}`} alt={props.member.name} />
      </div>
      <div className="member-info">
        <div className="name">{props.member.name}</div>
        <div className="tagline">{props.member.message}</div>
      </div>
    </div>
  );
};

export default MemberTemplate;
