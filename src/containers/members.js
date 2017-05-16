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
    this.filterMembers = this.filterMembers.bind(this);
    this.correctRender = this.correctRender.bind(this);
  }

  componentDidMount() {
    this.props.fetchMembers();
  }

  // map out all the members from the list of members in the json
  mapMembers() {
    if (this.props.members != null) {
      const memberItems = this.props.members.map((member) => {
        return (
          <div className="member-layout" key={member.name}>
            <button type="member-click">
              <a href={member.url}>
                <MemberTemplate getAddress={this.props.getAddress} member={member} id={member.name} />
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

  // map out only the members that are on in 17S
  filterMembers() {
    if (this.props.members != null) {
      const allMembers = [];
      this.props.members.map((member) => {
        member.terms_on.forEach((term) => {
          if (term === '17S') {
            allMembers.push(member);
          }
        });
        return null;
      });
      const memberItems = allMembers.map((member) => {
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

  // render the members depending on what the filter is
  correctRender() {
    if (this.props.filter === true) {
      return (
        <div>
          {this.filterMembers()}
        </div>
      );
    } else {
      return (
        <div>
          {this.mapMembers()}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.correctRender()}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    members: state.members.all,
    filter: state.members.filter,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchMembers: () => dispatch(fetchMembers()),
  }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Members));
