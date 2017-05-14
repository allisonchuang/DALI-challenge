import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

export default function (ComposedComponent) {
  class requireAuth extends Component {
    constructor(props) {
      super(props);

      this.state = {};
      this.componentWillMount = this.componentWillMount.bind(this);
      this.componentWillUpdate = this.componentWillUpdate.bind(this);
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/signin');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
}

  const mapStateToProps = state => (
    {
      authenticated: state.auth.authenticated,
    }
);

  return connect(mapStateToProps, null)(requireAuth);
}
