import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Posts from '../containers/posts';
import NewPost from '../containers/new-post';
import Post from '../containers/post';
import SignIn from '../containers/signin';
import SignUp from '../containers/signup';
import Nav from '../containers/navbar';
// import Error from '../containers/error';
import requireAuth from '../containers/requireAuth';
import '../style.scss';

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={requireAuth(NewPost)} />
          <Route path="/post/:postID" component={Post} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route render={() => (<div>post not found</div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
