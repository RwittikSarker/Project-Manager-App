import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage";
import AuthPage from "./view/AuthPage";
import Project from "./view/ProjectsPage"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={AuthPage} />
        <Route path="/signup" component={AuthPage} />
        <Route path="/projects" component={Project} />
      </Switch>
    </Router>
  );
};

export default App;
