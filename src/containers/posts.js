import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchMembers } from '../actions';
import MemberTemplate from '../components/member-template';

class Members extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.componentDidMount = this.componentDidMount.bind(this);
    this.mapMembers = this.mapMembers.bind(this);
  }

  componentDidMount() {
    this.props.fetchMembers();
  }

  // map out all the members from the list of members
  mapMembers() {
    if (this.props.members != null) {
      const memberItems = this.props.members.map((member) => {
        return (
          <div className="member-layout" key={member.name}>
            <button type="member-click">
              <a href={member.url}>
                <MemberTemplate member={member} id={member.name} />
              </a>
            </button>
          </div>
        );
      });
      return (
        <div className="page">
          {memberItems}
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
        {this.mapMembers()}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    members: state.members.all,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchMembers: () => dispatch(fetchMembers()),
  }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Members));
