import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signupUser, goTo, clearError } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      username: '',
      profile: '',
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onProfileChange = this.onProfileChange.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }
  onProfileChange(event) {
    this.setState({ profile: event.target.value });
  }

  renderError() {
    if (this.props.error === null) {
      return <div />;
    } else {
      return <div className="error">{this.props.error}</div>;
    }
  }

  render() {
    return (
      <div className="signin-page">
        <div className="new-signin">
          <div className="signin-title">Sign Up</div>
          <input className="signin" placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
          <input className="signin" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
          <input className="signin" placeholder="Name" value={this.state.username} onChange={this.onUsernameChange} />
          <input className="signin" placeholder="Profile Picture URL" value={this.state.profile} onChange={this.onProfileChange} />
          <div className="signin-buttons">
            <button type="signin"
              onClick={() => {
                this.props.signup(
                { email: this.state.email, password: this.state.password, username: this.state.username, profile: this.state.profile },
                this.props.history);
                this.setState({
                  email: '',
                  password: '',
                  username: '',
                  profile: '',
                });
              }}
            >Sign Up</button>
            <button type="signin" onClick={() => { this.props.goTo('/signin', this.props.history); this.props.clearError(); }}>Already have an Account? Sign in here</button>
          </div>
          {this.renderError()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    error: state.auth.message,
  }
);

const mapDispatchToProps = dispatch => (
  {
    signup: ({ email, password, username, profile }, history) => dispatch(signupUser({ email, password, username, profile }, history)),
    goTo: (path, history) => dispatch(goTo(path, history)),
    clearError: () => dispatch(clearError()),
  }
);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
