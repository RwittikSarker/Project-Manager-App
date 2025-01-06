import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./view/LandingPage";
import AuthPage from "./view/AuthPage";
import Project from "./view/ProjectsPage"
import AddProjectPage from "./view/AddProjectPage";
import AdminViewPage from "./view/AdminViewPage";
import ProfilePage from "./view/ProfilePage";
import ChangePassword from "./view/ChangePassword";
import TasksPage from "./view/TasksPage";
import AddTaskPage from "./view/AddTaskPage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={AuthPage} />
        <Route exact path="/signup" component={AuthPage} />
        <Route exact path="/projects" component={Project} />
        <Route exact path="/addprojectpage" component={AddProjectPage} />
        <Route exact path="/adminview" component={AdminViewPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route path="/changepassword" component={ChangePassword} />
        <Route exact path="/tasks" component={TasksPage} />
        <Route exact path="/addtaskpage" component={AddTaskPage} />
      </Switch>
    </Router>
  );
};

export default App;
