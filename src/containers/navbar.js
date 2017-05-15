import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signoutUser, goTo, clearError } from '../actions';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.renderSignup = this.renderSignup.bind(this);
  }

  renderSignup(authenticated) {
    if (authenticated) {
      return (
        <button type="sign" onClick={() => { this.props.signout(this.props.history); }}>Sign Out</button>
      );
    } else {
      return <button type="sign" onClick={() => { this.props.goTo('/signin', this.props.history); this.props.clearError(); }}>Sign In</button>;
    }
  }

  render() {
    return (
      <div className="top">
        <div className="bar">
          <button type="header" onClick={() => { this.props.goTo('/', this.props.history); }}>My Blog</button>
          <button type="add-button" onClick={() => { this.props.goTo('/posts/new', this.props.history); }}>Add Post</button>
          {this.renderSignup(this.props.auth)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth.authenticated,
  }
);

const mapDispatchToProps = dispatch => (
  {
    signout: history => dispatch(signoutUser(history)),
    goTo: (path, history) => dispatch(goTo(path, history)),
    clearError: () => dispatch(clearError()),
  }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
