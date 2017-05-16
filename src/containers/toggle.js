import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { filterMembers } from '../actions';

// Toggle style
const styles = {
  toggle: {
    margin: 15,
    maxWidth: 230,
  },
};

// Toggle makes use of Google Material-Ui components package
// Every time the toggle is used, change the filter
const Toggler = (props) => {
  return (
    <MuiThemeProvider>
      <div style={styles.toggle}>
        <Toggle label="Show only 17S members" onToggle={() => { props.filterMembers(props.onFilter); }} />
      </div>
    </MuiThemeProvider>
  );
};

const mapStateToProps = state => (
  {
    onFilter: state.members.filter,
  }
);

const mapDispatchToProps = dispatch => (
  {
    filterMembers: onFilter => dispatch(filterMembers(onFilter)),
  }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Toggler));
