import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Posts from '../containers/posts';
import NewPost from '../containers/new-post';
import Post from '../containers/post';
import '../style.scss';


const Nav = (props) => {
  return (
    <div className="top">
      <div className="bar">
        <div className="header">My Blog</div>
        <NavLink to="/posts/new"><button type="add-button">Add</button></NavLink>
      </div>
    </div>
  );
};

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={NewPost} />
          <Route path="/post/:postID" component={Post} />
          <Route render={() => (<div>post not found</div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
