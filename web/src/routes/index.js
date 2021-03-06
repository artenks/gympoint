import React from 'react';
import { Switch } from 'react-router-dom';

import HelpOrderList from '../pages/HelpOrderList';
import PlanEditor from '../pages/PlanEditor';
import PlanList from '../pages/PlanList';
import PlanRegister from '../pages/PlanRegister';
import Profile from '../pages/Profile';
import RegistrationEditor from '../pages/RegistrationEditor';
import RegistrationList from '../pages/RegistrationList';
import RegistrationRegister from '../pages/RegistrationRegister';
import SignIn from '../pages/SignIn';
import StudentEditor from '../pages/StudentEditor';
import StudentList from '../pages/StudentList';
import StudentRegister from '../pages/StudentRegister';
import Route from './Route';

export default function routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={StudentList} isPrivate />
      <Route path="/students/register" component={StudentRegister} isPrivate />
      <Route path="/students/:id/edit" component={StudentEditor} isPrivate />

      <Route path="/plans" exact component={PlanList} isPrivate />
      <Route path="/plans/register" component={PlanRegister} isPrivate />
      <Route path="/plans/:id/edit" component={PlanEditor} isPrivate />

      <Route
        path="/registrations"
        exact
        component={RegistrationList}
        isPrivate
      />
      <Route
        path="/registrations/register"
        component={RegistrationRegister}
        isPrivate
      />
      <Route
        path="/registrations/:id/edit"
        component={RegistrationEditor}
        isPrivate
      />

      <Route path="/helpOrders" exact component={HelpOrderList} isPrivate />
      <Route path="/profile" exact component={Profile} isPrivate />
    </Switch>
  );
}
