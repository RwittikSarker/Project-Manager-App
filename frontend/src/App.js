import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage";
import AuthPage from "./view/AuthPage";
import Project from "./view/ProjectsPage"
import AddProjectPage from "./view/AddProjectPage";
import AdminViewPage from "./view/AdminViewPage";
import ProfilePage from "./view/ProfilePage";
import ChangePassword from "./view/ChangePassword";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={AuthPage} />
        <Route path="/signup" component={AuthPage} />
        <Route path="/projects" component={Project} />
        <Route path="/addprojectpage" component={AddProjectPage} />
        <Route path="/adminview" component={AdminViewPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/changepassword" component={ChangePassword} />
      </Switch>
    </Router>
  );
};

export default App;
