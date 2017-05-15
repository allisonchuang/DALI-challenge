import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Members from '../containers/posts';
import '../style.scss';

// navbar at top of page
const Nav = (props) => {
  return (
    <div className="top">
      <div className="bar">
        <div className="header">DALI Dashboard</div>
      </div>
    </div>
  );
};

// body of page
const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Members} />
          <Route render={() => (<div>post not found</div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
