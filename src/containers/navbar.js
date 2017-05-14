import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signoutUser, goToSignin, goToHome, goToNew } from '../actions';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.renderSignup = this.renderSignup.bind(this);
  }

  renderSignup(authenticated) {
    if (authenticated) {
      return <button type="sign" onClick={() => { this.props.signout(this.props.history); }}>Sign Out</button>;
    } else {
      return <button type="sign" onClick={() => { this.props.goToSignin(this.props.history); }}>Sign In</button>;
    }
  }

  render() {
    return (
      <div className="top">
        <div className="bar">
          <button type="header" onClick={() => { this.props.goToHome(this.props.history); }}>My Blog</button>
          <button type="add-button" onClick={() => { this.props.goToNew(this.props.history); }}>Add</button>
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
    goToSignin: history => dispatch(goToSignin(history)),
    goToHome: history => dispatch(goToHome(history)),
    goToNew: history => dispatch(goToNew(history)),
  }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
