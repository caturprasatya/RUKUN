import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dashboard from './pages/Dashboard'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Account from './pages/Account'
import Announcements from './pages/Announcements'
import Transactions from './pages/Transactions'
import Suggestions from './pages/Suggestions'
import Villagers from './pages/Villagers'
import Reports from './pages/Reports'
import Login from './pages/Login'
import Register from './pages/Register'
import EditAccount from './pages/EditAccount'
import EditVillage from './pages/EditVillage'

function App() {
  return (
    <Router>
      <div className="App">
    <Switch>
      <Route path="/reports">
        <Reports></Reports>
      </Route>
      <Route path="/transactions">
        <Transactions></Transactions>
      </Route>
      <Route path="/account/edit">
        <EditAccount></EditAccount>
      </Route>
      <Route path="/account">
        <Account></Account>
      </Route>
      <Route path="/announcements">
        <Announcements></Announcements>
      </Route>
      <Route path="/suggestions">
        <Suggestions></Suggestions>
      </Route>
      <Route path="/village/edit">
        <EditVillage></EditVillage>
      </Route>
      <Route path="/villagers">
        <Villagers></Villagers>
      </Route>
      <Route path="/dashboard">
        <Dashboard></Dashboard>
      </Route>
      <Route path="/register">
        <Register></Register>
      </Route>
      <Route path="/">
        <Login></Login>
      </Route>
    </Switch>
      </div>
    </Router>
  );
}

export default App;
