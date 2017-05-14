import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, BrowserRouter as NavLink } from 'react-router-dom';
import { signinUser, signupUser } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div className="signin-page">
        <div className="new-signin">
          <div className="signin-title">Sign In / Sign Up</div>
          <input className="signin" placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
          <input className="signin" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
          <div className="signin-buttons">
            <NavLink to="/posts/"><button type="signin"
              onClick={() => {
                this.props.signin(
                { email: this.state.email, password: this.state.password },
                this.props.history);
                this.setState({
                  email: '',
                  password: '',
                });
              }}
            >Sign In</button></NavLink>
            <NavLink to="/posts/"><button type="signin"
              onClick={() => {
                this.props.signup(
                  { email: this.state.email, password: this.state.password },
                  this.props.history);
                this.setState({
                  email: '',
                  password: '',
                });
              }}
            >Sign Up</button></NavLink>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  {
    signin: ({ email, password }, history) => dispatch(signinUser({ email, password }, history)),
    signup: ({ email, password }, history) => dispatch(signupUser({ email, password }, history)),
  }
);


export default withRouter(connect(null, mapDispatchToProps)(SignIn));
