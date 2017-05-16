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

  // map out members from the list of members in the json
  mapMembers() {
    if (this.props.members != null) {
      let listOfMembers = [];

      // if the filter is on, only add 17S members to the listOfMembers
      if (this.props.filter === true) {
        this.props.members.map((member) => {
          member.terms_on.forEach((term) => {
            if (term === '17S') {
              listOfMembers.push(member);
            }
          });
          return null;
        });

      // if the filter is off, look at all the DALI members
      } else {
        listOfMembers = this.props.members;
      }

      // make a MemberTemplate for each member in listOfMembers
      const memberItems = listOfMembers.map((member) => {
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

      // render all the members
      return (
        <div className="page">
          {memberItems}
        </div>
      );

    // if the members have not been processed by the axios call yet, just render "loading"
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
    filter: state.members.filter,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchMembers: () => dispatch(fetchMembers()),
  }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Members));
