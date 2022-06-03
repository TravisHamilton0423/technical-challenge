import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/home';
import NotFound from '../pages/not-found';
import ContactsPage from '../pages/contacts';
import CallList from '../pages/call-list';

const Routes = () => {
  return (
    <Switch>
      <Route path="/home" component={HomePage} />
      <Route path="/contacts" component={ContactsPage} />
      <Route path="/call" component={CallList} />
      <Route exact path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
